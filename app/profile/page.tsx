'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function ProfilePage() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState('');
  const [initials, setInitials] = useState('');
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();
        setUser({ ...user, ...data });
        setFullName(data?.full_name || '');
        setInitials(data?.initials || '');
      }
    };
    fetchUser();
  }, [supabase]);

  const updateProfile = async () => {
    if (!user) return;
    const { error } = await supabase
      .from('users')
      .update({ full_name: fullName, initials })
      .eq('id', user.id);

    if (error) {
      console.error('Error updating profile:', error);
    } else {
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className={`container mx-auto mt-8 p-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Link href="/taskboard" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Back to Dashboard
        </Link>
      </div>
      {user && (
        <div>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          <div className="mb-4">
            <label className="block mb-2">Full Name:</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Initials:</label>
            <input
              type="text"
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
              className="w-full p-2 border rounded"
              maxLength={2}
            />
          </div>
          <button
            onClick={updateProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
          <button onClick={toggleTheme} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Toggle Theme
          </button>
        </div>
      )}
    </div>
  );
}