import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Design Token Types
export interface ColorToken {
  name: string
  value: string
  category: 'primary' | 'secondary' | 'neutral' | 'semantic' | 'custom'
}

export interface SpacingToken {
  name: string
  value: string
  rem: number
  px: number
}

export interface TypographyToken {
  name: string
  fontSize: string
  lineHeight: string
  fontWeight: string
  letterSpacing?: string
}

export interface BorderRadiusToken {
  name: string
  value: string
}

export interface BreakpointToken {
  name: string
  value: string
  px: number
}

export interface ContainerToken {
  name: string
  maxWidth: string
  padding: string
}

export interface DesignTokens {
  // Color system
  colors: {
    light: Record<string, ColorToken>
    dark: Record<string, ColorToken>
  }
  
  // Typography
  typography: {
    fontFamily: {
      primary: string
      secondary: string
      mono: string
    }
    fontSizes: Record<string, TypographyToken>
  }
  
  // Spacing system
  spacing: Record<string, SpacingToken>
  
  // Border radius
  borderRadius: Record<string, BorderRadiusToken>
  
  // Breakpoints
  breakpoints: Record<string, BreakpointToken>
  
  // Container sizes
  containers: Record<string, ContainerToken>
  
  // Shadow system
  shadows: Record<string, string>
  
  // Animation system
  animations: Record<string, {
    duration: string
    easing: string
  }>
}

export type ThemeMode = 'light' | 'dark' | 'auto'

interface DesignTokensState {
  // Current tokens
  tokens: DesignTokens
  
  // Theme state
  currentTheme: ThemeMode
  
  // Token management
  updateColorToken: (key: string, token: ColorToken, theme?: 'light' | 'dark') => void
  updateTypographyToken: (key: string, token: TypographyToken) => void
  updateSpacingToken: (key: string, token: SpacingToken) => void
  updateBorderRadiusToken: (key: string, token: BorderRadiusToken) => void
  updateBreakpointToken: (key: string, token: BreakpointToken) => void
  updateContainerToken: (key: string, token: ContainerToken) => void
  
  // Theme switching
  setTheme: (theme: ThemeMode) => void
  
  // Token utilities
  getTokenValue: (path: string) => string | undefined
  exportTokens: () => string
  importTokens: (tokens: string) => void
  resetToDefaults: () => void
  
  // Real-time updates
  subscribeToTokenChanges: (callback: () => void) => () => void
}

// Default design tokens
const defaultTokens: DesignTokens = {
  colors: {
    light: {
      primary: { name: 'Primary', value: '#3b82f6', category: 'primary' },
      primaryHover: { name: 'Primary Hover', value: '#2563eb', category: 'primary' },
      secondary: { name: 'Secondary', value: '#64748b', category: 'secondary' },
      secondaryHover: { name: 'Secondary Hover', value: '#475569', category: 'secondary' },
      background: { name: 'Background', value: '#ffffff', category: 'neutral' },
      surface: { name: 'Surface', value: '#f8fafc', category: 'neutral' },
      border: { name: 'Border', value: '#e2e8f0', category: 'neutral' },
      text: { name: 'Text', value: '#0f172a', category: 'neutral' },
      textMuted: { name: 'Text Muted', value: '#64748b', category: 'neutral' },
      success: { name: 'Success', value: '#10b981', category: 'semantic' },
      warning: { name: 'Warning', value: '#f59e0b', category: 'semantic' },
      error: { name: 'Error', value: '#ef4444', category: 'semantic' },
      info: { name: 'Info', value: '#06b6d4', category: 'semantic' },
    },
    dark: {
      primary: { name: 'Primary', value: '#60a5fa', category: 'primary' },
      primaryHover: { name: 'Primary Hover', value: '#3b82f6', category: 'primary' },
      secondary: { name: 'Secondary', value: '#94a3b8', category: 'secondary' },
      secondaryHover: { name: 'Secondary Hover', value: '#cbd5e1', category: 'secondary' },
      background: { name: 'Background', value: '#0f172a', category: 'neutral' },
      surface: { name: 'Surface', value: '#1e293b', category: 'neutral' },
      border: { name: 'Border', value: '#334155', category: 'neutral' },
      text: { name: 'Text', value: '#f1f5f9', category: 'neutral' },
      textMuted: { name: 'Text Muted', value: '#94a3b8', category: 'neutral' },
      success: { name: 'Success', value: '#34d399', category: 'semantic' },
      warning: { name: 'Warning', value: '#fbbf24', category: 'semantic' },
      error: { name: 'Error', value: '#f87171', category: 'semantic' },
      info: { name: 'Info', value: '#22d3ee', category: 'semantic' },
    }
  },
  
  typography: {
    fontFamily: {
      primary: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      secondary: 'Inter, system-ui, sans-serif',
      mono: 'Monaco, "Cascadia Code", "SF Mono", Consolas, monospace'
    },
    fontSizes: {
      xs: { name: 'Extra Small', fontSize: '0.75rem', lineHeight: '1rem', fontWeight: '400' },
      sm: { name: 'Small', fontSize: '0.875rem', lineHeight: '1.25rem', fontWeight: '400' },
      base: { name: 'Base', fontSize: '1rem', lineHeight: '1.5rem', fontWeight: '400' },
      lg: { name: 'Large', fontSize: '1.125rem', lineHeight: '1.75rem', fontWeight: '400' },
      xl: { name: 'Extra Large', fontSize: '1.25rem', lineHeight: '1.75rem', fontWeight: '500' },
      '2xl': { name: '2X Large', fontSize: '1.5rem', lineHeight: '2rem', fontWeight: '600' },
      '3xl': { name: '3X Large', fontSize: '1.875rem', lineHeight: '2.25rem', fontWeight: '700' },
      '4xl': { name: '4X Large', fontSize: '2.25rem', lineHeight: '2.5rem', fontWeight: '800' },
    }
  },
  
  spacing: {
    '0': { name: 'None', value: '0', rem: 0, px: 0 },
    '1': { name: 'XS', value: '0.25rem', rem: 0.25, px: 4 },
    '2': { name: 'SM', value: '0.5rem', rem: 0.5, px: 8 },
    '3': { name: 'MD', value: '0.75rem', rem: 0.75, px: 12 },
    '4': { name: 'LG', value: '1rem', rem: 1, px: 16 },
    '5': { name: 'XL', value: '1.25rem', rem: 1.25, px: 20 },
    '6': { name: '2XL', value: '1.5rem', rem: 1.5, px: 24 },
    '8': { name: '3XL', value: '2rem', rem: 2, px: 32 },
    '10': { name: '4XL', value: '2.5rem', rem: 2.5, px: 40 },
    '12': { name: '5XL', value: '3rem', rem: 3, px: 48 },
    '16': { name: '6XL', value: '4rem', rem: 4, px: 64 },
    '20': { name: '7XL', value: '5rem', rem: 5, px: 80 },
    '24': { name: '8XL', value: '6rem', rem: 6, px: 96 },
    // Semantic spacing tokens for easier reference
    xs: { name: 'Extra Small', value: '0.25rem', rem: 0.25, px: 4 },
    sm: { name: 'Small', value: '0.5rem', rem: 0.5, px: 8 },
    md: { name: 'Medium', value: '1rem', rem: 1, px: 16 },
    lg: { name: 'Large', value: '1.5rem', rem: 1.5, px: 24 },
    xl: { name: 'Extra Large', value: '2rem', rem: 2, px: 32 },
    '2xl': { name: '2X Large', value: '2.5rem', rem: 2.5, px: 40 },
    '3xl': { name: '3X Large', value: '3rem', rem: 3, px: 48 },
  },
  
  borderRadius: {
    none: { name: 'None', value: '0' },
    sm: { name: 'Small', value: '0.125rem' },
    md: { name: 'Medium', value: '0.375rem' },
    lg: { name: 'Large', value: '0.5rem' },
    xl: { name: 'Extra Large', value: '0.75rem' },
    '2xl': { name: '2X Large', value: '1rem' },
    full: { name: 'Full', value: '9999px' },
  },
  
  breakpoints: {
    sm: { name: 'Small', value: '640px', px: 640 },
    md: { name: 'Medium', value: '768px', px: 768 },
    lg: { name: 'Large', value: '1024px', px: 1024 },
    xl: { name: 'Extra Large', value: '1280px', px: 1280 },
    '2xl': { name: '2X Large', value: '1536px', px: 1536 },
  },
  
  containers: {
    sm: { name: 'Small', maxWidth: '640px', padding: '1rem' },
    md: { name: 'Medium', maxWidth: '768px', padding: '1.5rem' },
    lg: { name: 'Large', maxWidth: '1024px', padding: '2rem' },
    xl: { name: 'Extra Large', maxWidth: '1280px', padding: '2rem' },
    '2xl': { name: '2X Large', maxWidth: '1400px', padding: '2rem' },
    full: { name: 'Full Width', maxWidth: '100%', padding: '1rem' },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },
  
  animations: {
    fast: { duration: '150ms', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    normal: { duration: '300ms', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    slow: { duration: '500ms', easing: 'cubic-bezier(0.4, 0, 0.2, 1)' },
    bounce: { duration: '1s', easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)' },
  }
}

// Token change listeners
const tokenChangeListeners: Set<() => void> = new Set()

export const useDesignTokensStore = create<DesignTokensState>()(
  persist(
    (set, get) => ({
      tokens: defaultTokens,
      currentTheme: 'light',
      
      updateColorToken: (key: string, token: ColorToken, theme = 'light') => {
        set(state => ({
          tokens: {
            ...state.tokens,
            colors: {
              ...state.tokens.colors,
              [theme]: {
                ...state.tokens.colors[theme],
                [key]: token
              }
            }
          }
        }))
        // Notify listeners
        tokenChangeListeners.forEach(callback => callback())
      },
      
      updateTypographyToken: (key: string, token: TypographyToken) => {
        set(state => ({
          tokens: {
            ...state.tokens,
            typography: {
              ...state.tokens.typography,
              fontSizes: {
                ...state.tokens.typography.fontSizes,
                [key]: token
              }
            }
          }
        }))
        tokenChangeListeners.forEach(callback => callback())
      },
      
      updateSpacingToken: (key: string, token: SpacingToken) => {
        set(state => ({
          tokens: {
            ...state.tokens,
            spacing: {
              ...state.tokens.spacing,
              [key]: token
            }
          }
        }))
        tokenChangeListeners.forEach(callback => callback())
      },
      
      updateBorderRadiusToken: (key: string, token: BorderRadiusToken) => {
        set(state => ({
          tokens: {
            ...state.tokens,
            borderRadius: {
              ...state.tokens.borderRadius,
              [key]: token
            }
          }
        }))
        tokenChangeListeners.forEach(callback => callback())
      },
      
      updateBreakpointToken: (key: string, token: BreakpointToken) => {
        set(state => ({
          tokens: {
            ...state.tokens,
            breakpoints: {
              ...state.tokens.breakpoints,
              [key]: token
            }
          }
        }))
        tokenChangeListeners.forEach(callback => callback())
      },
      
      updateContainerToken: (key: string, token: ContainerToken) => {
        set(state => ({
          tokens: {
            ...state.tokens,
            containers: {
              ...state.tokens.containers,
              [key]: token
            }
          }
        }))
        tokenChangeListeners.forEach(callback => callback())
      },
      
      setTheme: (theme: ThemeMode) => {
        set({ currentTheme: theme })
        
        // Apply theme to document
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark')
        } else {
          // Auto mode - check system preference
          const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
          if (prefersDark) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
        
        tokenChangeListeners.forEach(callback => callback())
      },
      
      getTokenValue: (path: string) => {
        const parts = path.split('.')
        let current: any = get().tokens
        
        for (const part of parts) {
          if (current[part]) {
            current = current[part]
          } else {
            return undefined
          }
        }
        
        if (typeof current === 'object' && current.value) {
          return current.value
        }
        
        return typeof current === 'string' ? current : undefined
      },
      
      exportTokens: () => {
        return JSON.stringify(get().tokens, null, 2)
      },
      
      importTokens: (tokensJson: string) => {
        try {
          const tokens = JSON.parse(tokensJson)
          set({ tokens })
          tokenChangeListeners.forEach(callback => callback())
        } catch (error) {
          console.error('Failed to import tokens:', error)
        }
      },
      
      resetToDefaults: () => {
        set({ tokens: defaultTokens })
        tokenChangeListeners.forEach(callback => callback())
      },
      
      subscribeToTokenChanges: (callback: () => void) => {
        tokenChangeListeners.add(callback)
        return () => {
          tokenChangeListeners.delete(callback)
        }
      }
    }),
    {
      name: 'design-tokens-storage',
      partialize: (state) => ({
        tokens: state.tokens,
        currentTheme: state.currentTheme,
      }),
    }
  )
)
