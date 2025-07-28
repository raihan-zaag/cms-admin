import { createContext, useContext } from 'react';

export interface ThemeContextType {
  processToken: (tokenRef: string) => string;
  processMultipleTokens: (input: string) => string;
  processStyleObject: (styles: Record<string, any>) => Record<string, any>;
}

export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
