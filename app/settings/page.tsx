'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import Link from 'next/link';
import { useTheme } from "@/app/contexts/ThemeContext";

const SettingsPage = () => {
  const [settings, setSettings] = useState<any>(null);
  const supabase = createClientComponentClient();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchSettings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
            .from('user_settings')
            .select('*')
            .eq('user_id', user.id)
            .single();
        setSettings(data || { theme: theme, language: 'en', notifications_enabled: true });
      }
    };
    fetchSettings();
  }, [theme]);

  const updateSettings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
          .from('user_settings')
          .upsert({ user_id: user.id, ...settings });

      if (error) {
        console.error('Error updating settings:', error);
      } else {
        alert('Settings updated successfully!');
        setTheme(settings.theme);
      }
    }
  };

  if (!settings) return <div>Loading...</div>;

  return (
      <AuthenticatedLayout>
        <div className="container mx-auto mt-8 p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Settings</h1>
            <Link href="/taskboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Back to Dashboard
            </Link>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Theme:</label>
            <select
                value={settings.theme}
                onChange={(e) => {
                  setSettings({ ...settings, theme: e.target.value });
                  setTheme(e.target.value as 'light' | 'dark');
                }}
                className="w-full p-2 border rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Language:</label>
            <select
                value={settings.language}
                onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                className="w-full p-2 border rounded"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                  type="checkbox"
                  checked={settings.notifications_enabled}
                  onChange={(e) => setSettings({ ...settings, notifications_enabled: e.target.checked })}
                  className="mr-2"
              />
              Enable Notifications
            </label>
          </div>
          <button
              onClick={updateSettings}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Settings
          </button>
        </div>
      </AuthenticatedLayout>
  );
};

export default SettingsPage;
