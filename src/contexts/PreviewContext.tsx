/**
 * Preview Context for managing global design tokens during preview rendering
 * 
 * This provides a cleaner alternative to module-level global state
 */

import React, { createContext } from 'react';
import type { ReactNode } from 'react';
import type { GlobalDesignTokenSettings } from '@/hooks/useGlobalDesignTokens';

interface PreviewContextValue {
  globalDesignTokens?: GlobalDesignTokenSettings;
}

const PreviewContext = createContext<PreviewContextValue>({});

interface PreviewProviderProps {
  children: ReactNode;
  globalDesignTokens?: GlobalDesignTokenSettings;
}

export const PreviewProvider: React.FC<PreviewProviderProps> = ({
  children,
  globalDesignTokens
}) => {
  return (
    <PreviewContext.Provider value={{ globalDesignTokens }}>
      {children}
    </PreviewContext.Provider>
  );
};

export default PreviewContext;
