import React, { useEffect } from 'react';
import { useDesignTokensStore } from '@/store/design-tokens';
import { useTokenProcessor } from '@/lib/token-processor';
import { ThemeContext, type ThemeContextType } from '@/contexts/ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { subscribeToTokenChanges, currentTheme } = useDesignTokensStore();
  const { processToken, processMultipleTokens, processStyleObject, generateCSS } = useTokenProcessor();

  // Apply CSS custom properties to the document
  useEffect(() => {
    const applyThemeToDocument = () => {
      const css = generateCSS();
      
      // Remove existing theme styles
      const existingStyle = document.getElementById('design-tokens-css');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Add new theme styles
      const style = document.createElement('style');
      style.id = 'design-tokens-css';
      style.textContent = css;
      document.head.appendChild(style);
    };

    // Apply initial theme
    applyThemeToDocument();

    // Subscribe to token changes for real-time updates
    const unsubscribe = subscribeToTokenChanges(applyThemeToDocument);

    return () => {
      unsubscribe();
      // Clean up on unmount
      const existingStyle = document.getElementById('design-tokens-css');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [generateCSS, subscribeToTokenChanges]);

  // Apply theme class to document element
  useEffect(() => {
    const root = document.documentElement;
    
    if (currentTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else if (currentTheme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      // Auto mode - check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      }
    }
  }, [currentTheme]);

  const contextValue: ThemeContextType = {
    processToken,
    processMultipleTokens,
    processStyleObject,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
