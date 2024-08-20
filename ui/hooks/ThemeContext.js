"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCookie } from '../hooks/useCookie';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [cookieTheme, setCookieTheme] = useCookie('theme', 'light');
  const [theme, setTheme] = useState(cookieTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    setCookieTheme(theme, 365);
  }, [theme, setCookieTheme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
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