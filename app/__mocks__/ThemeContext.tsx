import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: jest.fn(),
});

export const useTheme = () => React.useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ theme: 'light', toggleTheme: jest.fn() }}>
      {children}
    </ThemeContext.Provider>
  );
};