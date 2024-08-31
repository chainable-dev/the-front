'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import AuthenticatedLayout from '@/app/layouts/AuthenticatedLayout';

export default function ProfilePage() {
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
    <AuthenticatedLayout>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Profile</h1>
        {user && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name:</label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="initials" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Initials:</label>
              <input
                id="initials"
                type="text"
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                maxLength={2}
              />
            </div>
            <button
              onClick={updateProfile}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Update Profile
            </button>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}