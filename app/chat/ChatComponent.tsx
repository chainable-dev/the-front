'use client';

import { useState, useEffect } from 'react';
import { useChat } from 'ai/react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FaBars, FaCog, FaSave, FaCheck, FaTimes } from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';
import toast, { Toaster } from 'react-hot-toast';

interface ChatHistory {
  id: string;
  title: string;
}

const models = [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai' },
  { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
  { id: 'claude-2', name: 'Claude 2', provider: 'anthropic' },
  { id: 'mistral-medium', name: 'Mistral Medium', provider: 'mistral' },
  { id: 'gemini-pro', name: 'Gemini Pro', provider: 'gemini' },
  { id: 'llama2', name: 'Llama 2', provider: 'ollama' },
];

export default function ChatComponent({ userId }: { userId: string }) {
  const { theme } = useTheme();
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    mistral: '',
    gemini: '',
    ollama: '',
  });
  const [savedResponses, setSavedResponses] = useState<Set<string>>(new Set());
  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: '/api/chat',
    body: { model: selectedModel, provider: models.find(m => m.id === selectedModel)?.provider },
  });
  const supabase = createClientComponentClient();
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');

  useEffect(() => {
    fetchChatHistories();
    fetchApiKeys();
    fetchSelectedModel();
  }, []);

  const fetchChatHistories = async () => {
    const { data, error } = await supabase
      .from('chat_histories')
      .select('id, title')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching chat histories:', error);
    } else {
      setChatHistories(data);
    }
  };

  const fetchApiKeys = async () => {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching API keys:', error);
    } else {
      setApiKeys({
        openai: data.openai_api_key || '',
        anthropic: data.anthropic_api_key || '',
        mistral: data.mistral_api_key || '',
        gemini: data.gemini_api_key || '',
        ollama: data.ollama_api_key || '',
      });
    }
  };

  const fetchSelectedModel = async () => {
    const { data, error } = await supabase
      .from('user_settings')
      .select('selected_model')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching selected model:', error);
    } else if (data && data.selected_model) {
      setSelectedModel(data.selected_model);
    }
  };

  const createNewChat = async () => {
    const { data, error } = await supabase
      .from('chat_histories')
      .insert({ user_id: userId, title: 'New Chat' })
      .select()
      .single();

    if (error) {
      console.error('Error creating new chat:', error);
    } else {
      setChatHistories([data, ...chatHistories]);
      setSelectedChatId(data.id);
      setMessages([]);
    }
  };

  const selectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    // TODO: Fetch messages for this chat from the database
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChatId) {
      await createNewChat();
    }
    handleSubmit(e);
    // TODO: Save the new message to the database
  };

  const saveApiKeys = async () => {
    const { error } = await supabase
      .from('user_settings')
      .upsert({
        user_id: userId,
        openai_api_key: apiKeys.openai,
        anthropic_api_key: apiKeys.anthropic,
        mistral_api_key: apiKeys.mistral,
        gemini_api_key: apiKeys.gemini,
        ollama_api_key: apiKeys.ollama,
      }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error saving API keys:', error);
    } else {
      setIsSettingsOpen(false);
    }
  };

  const handleSaveResponse = async (messageId: string) => {
    const messageToSave = messages.find(m => m.id === messageId);
    if (!messageToSave) return;

    const { error } = await supabase
      .from('saved_responses')
      .insert({
        user_id: userId,
        content: messageToSave.content,
        model: selectedModel,
        chat_id: selectedChatId
      });

    if (error) {
      console.error('Error saving response:', error);
      toast.error('Failed to save response. Please try again.');
    } else {
      setSavedResponses(prev => new Set(prev).add(messageId));
      toast.success('Response saved successfully!');
    }
  };

  const handleModelChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);

    const { error } = await supabase
      .from('user_settings')
      .upsert({ user_id: userId, selected_model: newModel }, { onConflict: 'user_id' });

    if (error) {
      console.error('Error saving selected model:', error);
    }
  };

  const currentProvider = models.find(m => m.id === selectedModel)?.provider;

  const checkConnection = async () => {
    setConnectionStatus('checking');
    try {
      const response = await fetch('/api/check-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ provider: currentProvider, apiKey: apiKeys[currentProvider as keyof typeof apiKeys] }),
      });
      if (response.ok) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      setConnectionStatus('disconnected');
    }
  };

  useEffect(() => {
    checkConnection();
  }, [selectedModel, apiKeys]);

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" />
      <header className="bg-white dark:bg-gray-800 shadow-md p-4">
        <div className="flex items-center justify-between">
          <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
            <FaBars size={24} />
          </button>
          <h1 className="text-2xl font-bold text-black dark:text-white">TheApp AI Chatbot</h1>
          <div className="flex items-center space-x-4">
            <ConnectionStatus status={connectionStatus} />
            <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100">
              <FaCog size={24} />
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSettingsOpen}
          selectedModel={selectedModel}
          apiKeys={apiKeys}
          onModelChange={handleModelChange}
          onApiKeyChange={(provider, value) => setApiKeys({ ...apiKeys, [provider]: value })}
          onSave={saveApiKeys}
        />
        <main className="flex-1 flex flex-col">
          <ChatMessages messages={messages} onSaveResponse={handleSaveResponse} savedResponses={savedResponses} />
          <ChatInput input={input} onInputChange={handleInputChange} onSubmit={handleChatSubmit} />
        </main>
      </div>
    </div>
  );
}

function ConnectionStatus({ status }: { status: 'connected' | 'disconnected' | 'checking' }) {
  const statusColors = {
    connected: 'text-green-500',
    disconnected: 'text-red-500',
    checking: 'text-yellow-500',
  };

  return (
    <div className={`flex items-center ${statusColors[status]}`}>
      {status === 'connected' && <FaCheck className="mr-2" />}
      {status === 'disconnected' && <FaTimes className="mr-2" />}
      {status === 'checking' && <div className="mr-2 w-4 h-4 border-t-2 border-b-2 border-current rounded-full animate-spin"></div>}
      <span className="capitalize">{status}</span>
    </div>
  );
}

function Sidebar({ isOpen, selectedModel, apiKeys, onModelChange, onApiKeyChange, onSave }) {
  return (
    <div className={`w-64 bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Settings</h2>
        <div className="mb-4">
          <label htmlFor="model-select" className="block mb-2 text-sm font-medium text-black dark:text-white">Select Model:</label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={onModelChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>{model.name}</option>
            ))}
          </select>
        </div>
        {Object.entries(apiKeys).map(([provider, key]) => (
          <div key={provider} className="mb-4">
            <label htmlFor={`${provider}-api-key`} className="block mb-2 text-sm font-medium text-black dark:text-white capitalize">{provider} API Key:</label>
            <input
              type="password"
              id={`${provider}-api-key`}
              value={key}
              onChange={(e) => onApiKeyChange(provider, e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-black dark:text-white"
            />
          </div>
        ))}
        <button onClick={onSave} className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  );
}

function ChatMessages({ messages, onSaveResponse, savedResponses }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(m => (
        <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-3/4 p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'}`}>
            <p>{m.content}</p>
            {m.role === 'assistant' && (
              <button
                onClick={() => onSaveResponse(m.id)}
                className="mt-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                title={savedResponses.has(m.id) ? "Response saved" : "Save response"}
              >
                <FaSave size={16} color={savedResponses.has(m.id) ? "#4CAF50" : "#9E9E9E"} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatInput({ input, onInputChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="flex space-x-2">
        <input
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-l-md bg-white dark:bg-gray-700 text-black dark:text-white"
          value={input}
          placeholder="Type your message..."
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </div>
    </form>
  );
}