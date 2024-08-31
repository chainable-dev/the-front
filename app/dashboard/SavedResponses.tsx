'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface SavedResponse {
  id: string;
  content: string;
  model: string;
  created_at: string;
}

export default function SavedResponses({ userId }: { userId: string }) {
  const [savedResponses, setSavedResponses] = useState<SavedResponse[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchSavedResponses();
  }, []);

  const fetchSavedResponses = async () => {
    const { data, error } = await supabase
      .from('saved_responses')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved responses:', error);
    } else {
      setSavedResponses(data);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Saved Responses</h2>
      <div className="space-y-4">
        {savedResponses.map((response) => (
          <div key={response.id} className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <p className="text-gray-600 dark:text-gray-300 mb-2">Model: {response.model}</p>
            <p className="text-black dark:text-white">{response.content}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Saved on: {new Date(response.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}