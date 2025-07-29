import React, { useEffect } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { 
  GlobalDesignTokensContext, 
  type GlobalDesignTokenSettings, 
  type GlobalDesignTokensContextType,
  defaultGlobalSettings 
} from '@/hooks/useGlobalDesignTokens';

interface DesignTokensProviderProps {
  children: React.ReactNode;
}

export const DesignTokensProvider: React.FC<DesignTokensProviderProps> = ({ children }) => {
  const [globalSettings, setGlobalSettings] = React.useState<GlobalDesignTokenSettings>(defaultGlobalSettings);

  const updateGlobalSettings = React.useCallback((updates: Partial<GlobalDesignTokenSettings>) => {
    setGlobalSettings(prev => {
      const newSettings = { ...prev };
      
      // Handle nested updates properly
      if (updates.fontFamily) {
        newSettings.fontFamily = { ...prev.fontFamily, ...updates.fontFamily };
      }
      if (updates.colors) {
        newSettings.colors = { ...prev.colors, ...updates.colors };
      }
      if (updates.spacing) {
        newSettings.spacing = { ...prev.spacing, ...updates.spacing };
      }
      if (updates.container) {
        newSettings.container = { ...prev.container, ...updates.container };
      }
      if (updates.layout) {
        newSettings.layout = { ...prev.layout, ...updates.layout };
      }
      
      // Apply any direct updates
      Object.keys(updates).forEach(key => {
        if (key !== 'fontFamily' && key !== 'colors' && key !== 'spacing' && key !== 'container' && key !== 'layout') {
          (newSettings as any)[key] = (updates as any)[key];
        }
      });
      
      console.log('Updated global settings:', newSettings);
      return newSettings;
    });
  }, []);

  const resetGlobalSettings = React.useCallback(() => {
    setGlobalSettings(defaultGlobalSettings);
  }, []);

  const applyGlobalSettingsToRootContainer = React.useCallback(() => {
    // This function can be used to programmatically apply global settings to the root container
    // It will be called when global settings change
    console.log('Applying global settings to root container:', globalSettings);
  }, [globalSettings]);

  // Apply global settings whenever they change
  useEffect(() => {
    applyGlobalSettingsToRootContainer();
  }, [applyGlobalSettingsToRootContainer]);

  const contextValue: GlobalDesignTokensContextType = {
    globalSettings,
    updateGlobalSettings,
    resetGlobalSettings,
    applyGlobalSettingsToRootContainer,
  };

  return (
    <GlobalDesignTokensContext.Provider value={contextValue}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </GlobalDesignTokensContext.Provider>
  );
};
