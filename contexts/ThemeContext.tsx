'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'light';
    }
    return 'light';
  });
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const loadTheme = async () => {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Try to get theme from cache first
        const cachedTheme = await supabase.auth.getSession().then(({ data }) => data.session?.user.user_metadata.theme);
        
        if (cachedTheme) {
          setTheme(cachedTheme as Theme);
        } else {
          const { data, error } = await supabase
            .from('user_settings')
            .select('theme')
            .eq('user_id', user.id)
            .single();

          if (data && !error) {
            setTheme(data.theme as Theme);
            // Cache the theme in user metadata
            await supabase.auth.updateUser({
              data: { theme: data.theme }
            });
          }
        }
      }
      setIsLoading(false);
    };

    loadTheme();
  }, [supabase]);

  useEffect(() => {
    if (!isLoading) {
      const saveTheme = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('user_settings')
            .upsert({ user_id: user.id, theme }, { onConflict: 'user_id' });
          
          // Update cached theme in user metadata
          await supabase.auth.updateUser({
            data: { theme }
          });
        }
      };

      saveTheme();

      // Save theme to localStorage
      localStorage.setItem('theme', theme);

      // Apply theme to html element
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
    }
  }, [theme, isLoading, supabase]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};