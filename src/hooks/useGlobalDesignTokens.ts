import React, { useContext } from 'react';

// Global design token settings for the root container
export interface GlobalDesignTokenSettings {
  // Typography defaults
  fontFamily: {
    primary: string;
    secondary: string;
    mono: string;
  };
  
  // Color defaults
  colors: {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    text: string;
    textMuted: string;
    border: string;
  };
  
  // Spacing defaults
  spacing: {
    containerPadding: string;
    componentGap: string;
    sectionSpacing: string;
  };
  
  // Container defaults
  container: {
    maxWidth: string;
    padding: string;
    paddingX?: string; // Horizontal padding (left/right)
    paddingY?: string; // Vertical padding (top/bottom)
    borderRadius: string;
  };
  
  // Layout defaults
  layout: {
    flexDirection: 'row' | 'column';
    justifyContent: string;
    alignItems: string;
    gap: string;
    gapX?: string; // Column gap (horizontal)
    gapY?: string; // Row gap (vertical)
  };
}

// Default global settings
export const defaultGlobalSettings: GlobalDesignTokenSettings = {
  fontFamily: {
    primary: '@font.primary',
    secondary: '@font.secondary',
    mono: '@font.mono',
  },
  colors: {
    background: '@color.background',
    surface: '@color.surface',
    primary: '@color.primary',
    secondary: '@color.secondary',
    text: '@color.text',
    textMuted: '@color.textMuted',
    border: '@color.border',
  },
  spacing: {
    containerPadding: '@spacing.lg',
    componentGap: '@spacing.md',
    sectionSpacing: '@spacing.xl',
  },
  container: {
    maxWidth: '@container.xl',
    padding: '@spacing.0',
    paddingX: undefined,
    paddingY: undefined,
    borderRadius: '@radius.md',
  },
  layout: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: '@spacing.0',
    gapX: undefined,
    gapY: undefined,
  },
};

// Context for global design token settings
export interface GlobalDesignTokensContextType {
  globalSettings: GlobalDesignTokenSettings;
  updateGlobalSettings: (updates: Partial<GlobalDesignTokenSettings>) => void;
  resetGlobalSettings: () => void;
  applyGlobalSettingsToRootContainer: () => void;
}

// This will be imported from the provider
export const GlobalDesignTokensContext = React.createContext<GlobalDesignTokensContextType | null>(null);

export const useGlobalDesignTokens = () => {
  const context = useContext(GlobalDesignTokensContext);
  if (!context) {
    throw new Error('useGlobalDesignTokens must be used within DesignTokensProvider');
  }
  return context;
};
