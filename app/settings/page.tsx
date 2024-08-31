'use client';

import React from 'react';
import BasePage from '@/components/BasePage';
import { useTheme } from '@/contexts/ThemeContext';
import appConfig from '@/config/appConfig';

export default function SettingsPage() {
    const { theme, toggleTheme } = useTheme();

    const handleSettingChange = (key: string, value: any) => {
        // Implement setting change logic here
        if (key === 'theme') {
            toggleTheme();
        }
        // Handle other settings...
    };

    return (
        <BasePage title="Settings">
            {appConfig.settings.map((setting) => (
                <div key={setting.key} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {setting.label}
                    </label>
                    {setting.type === 'toggle' && (
                        <button
                            onClick={() => handleSettingChange(setting.key, !theme)}
                            className={`mt-1 px-4 py-2 rounded ${
                                theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
                            }`}
                        >
                            {theme === 'dark' ? 'On' : 'Off'}
                        </button>
                    )}
                    {setting.type === 'select' && (
                        <select
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
                        >
                            {setting.options?.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            ))}
        </BasePage>
    );
}