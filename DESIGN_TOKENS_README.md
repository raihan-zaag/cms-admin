# 🌈 Design Tokens + Theming Engine

A complete design system with design tokens, real-time theming, and light/dark mode support built for the CMS Admin Tenant project.

## 🎯 Overview

This implementation provides a comprehensive design tokens system that allows you to:

- **Manage Global Design Tokens**: Colors, typography, spacing, border radius, breakpoints, and containers
- **Real-time Theme Switching**: Light/dark/auto modes with instant updates
- **Token-based Components**: Components that automatically adapt to design changes
- **Export/Import Tokens**: Save and share design systems
- **CSS Custom Properties**: Auto-generated CSS variables for external use

## 🏗️ Architecture

### Core Components

```
src/
├── store/design-tokens.ts           # Zustand store for token management
├── lib/token-processor.ts           # Token processing and CSS generation
├── contexts/ThemeContext.ts         # React context for theme
├── hooks/useTheme.ts               # Theme hook for components
├── components/
│   ├── providers/ThemeProvider.tsx  # Theme provider component
│   └── editor/design-tokens/        # UI components for token management
│       ├── DesignTokensPanel.tsx    # Main tokens panel
│       ├── ColorTokensSection.tsx   # Color tokens UI
│       ├── TypographyTokensSection.tsx
│       ├── SpacingTokensSection.tsx
│       ├── BorderRadiusTokensSection.tsx
│       ├── BreakpointsTokensSection.tsx
│       └── ContainersTokensSection.tsx
└── pages/DesignTokensDemo.tsx       # Demo page showing tokens in action
```

## 🚀 Usage

### 1. Basic Token Usage in Components

```tsx
import { useTheme } from '@/hooks/useTheme';

const MyComponent = () => {
  const { processToken } = useTheme();
  
  return (
    <div 
      style={{
        backgroundColor: processToken('@color.primary'),
        padding: processToken('@spacing.4'),
        borderRadius: processToken('@radius.md'),
        fontSize: processToken('@typography.lg')
      }}
    >
      Hello World
    </div>
  );
};
```

### 2. Processing Multiple Tokens

```tsx
const { processStyleObject } = useTheme();

const styles = processStyleObject({
  backgroundColor: '@color.surface',
  color: '@color.text',
  padding: '@spacing.4 @spacing.6',
  borderRadius: '@radius.lg'
});
```

### 3. Available Token Categories

#### Colors (`@color.*`)
- `@color.primary` - Primary brand color
- `@color.secondary` - Secondary color
- `@color.background` - Main background
- `@color.surface` - Surface background
- `@color.text` - Primary text color
- `@color.textMuted` - Muted text color
- `@color.border` - Border color
- `@color.success`, `@color.warning`, `@color.error`, `@color.info`

#### Typography (`@typography.*`)
- `@typography.xs` - Extra small text
- `@typography.sm` - Small text
- `@typography.base` - Base text size
- `@typography.lg` - Large text
- `@typography.xl` - Extra large text
- Plus: `@typography.lg.fontSize`, `@typography.lg.lineHeight`, etc.

#### Spacing (`@spacing.*`)
- `@spacing.1` through `@spacing.24` - Spacing scale
- Values in rem with px equivalents

#### Border Radius (`@radius.*`)
- `@radius.none` - No radius
- `@radius.sm` - Small radius
- `@radius.md` - Medium radius
- `@radius.lg` - Large radius
- `@radius.full` - Full radius (circular)

#### Breakpoints (`@breakpoint.*`)
- `@breakpoint.sm` - Small screens (640px)
- `@breakpoint.md` - Medium screens (768px)
- `@breakpoint.lg` - Large screens (1024px)
- `@breakpoint.xl` - Extra large screens (1280px)

#### Containers (`@container.*`)
- `@container.sm` - Small container
- `@container.md` - Medium container
- `@container.lg` - Large container
- `@container.xl` - Extra large container
- Plus: `@container.lg.padding` for container padding

## 🎨 Theme Management

### Theme Switching

```tsx
import { useDesignTokensStore } from '@/store/design-tokens';

const ThemeSwitcher = () => {
  const { currentTheme, setTheme } = useDesignTokensStore();
  
  return (
    <div>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('auto')}>Auto</button>
    </div>
  );
};
```

### Auto Theme Detection

The system automatically detects system theme preferences when set to 'auto' mode.

## 🔧 Customization

### Adding Custom Tokens

```tsx
const { updateColorToken } = useDesignTokensStore();

// Add a custom color token
updateColorToken('accent', {
  name: 'Accent Color',
  value: '#ff6b6b',
  category: 'custom'
}, 'light');
```

### Exporting/Importing Tokens

```tsx
const { exportTokens, importTokens } = useDesignTokensStore();

// Export current tokens
const tokensJson = exportTokens();

// Import tokens from JSON
importTokens(tokensJson);
```

## 🎪 Live Demo

Visit `/design-tokens-demo` to see the design tokens system in action with:

- Real-time theme switching
- Visual token representations
- Live component examples
- Generated CSS custom properties

## 🔌 Integration with Craft.js

The design tokens are fully integrated with your Craft.js editor:

1. **Design Tokens Panel**: Added as a new sidebar in the PageEditor
2. **Real-time Updates**: Changes in tokens immediately reflect in the canvas
3. **Token-aware Components**: Create components that use design tokens
4. **Visual Token Management**: Easy-to-use UI for managing all token types

## 📊 Features Implemented

### ✅ Core Features
- [x] Complete design tokens store (Zustand)
- [x] Real-time token processing
- [x] Light/dark/auto theme support
- [x] CSS custom properties generation
- [x] Token export/import functionality
- [x] Comprehensive UI for token management

### ✅ Token Categories
- [x] Colors (with theme variants)
- [x] Typography (font sizes, weights, line heights)
- [x] Spacing (rem/px scale)
- [x] Border radius
- [x] Breakpoints (responsive design)
- [x] Containers (max-width, padding)

### ✅ Integration
- [x] Craft.js editor integration
- [x] Real-time canvas updates
- [x] Theme provider at app level
- [x] Token processor utilities
- [x] Demo page with examples

## 🛠️ Technical Implementation

### Zustand Store Structure
- Persistent storage of tokens and theme preferences
- Real-time subscription system for token changes
- Type-safe token management with TypeScript

### Token Processing
- Smart token reference resolution (`@category.key`)
- CSS custom properties generation
- Multi-token string processing
- Style object processing

### React Integration
- Context-based theme provider
- Custom hooks for token access
- Real-time DOM updates
- Automatic CSS injection

## 🎯 Benefits

1. **Consistency**: Centralized design system ensures consistency across components
2. **Maintainability**: Single source of truth for design values
3. **Flexibility**: Easy to customize and extend
4. **Real-time**: Instant visual feedback when making changes
5. **Developer Experience**: Type-safe token usage with IntelliSense
6. **Accessibility**: Built-in dark mode and system preference detection

## 🔮 Future Enhancements

- **Style Dictionary Integration**: Export tokens to various formats
- **Figma Integration**: Import/export tokens from Figma
- **Component Token Overrides**: Per-component token customization
- **Animation Tokens**: Easing, duration, and transition tokens
- **Advanced Theming**: Multiple theme variants beyond light/dark

This design tokens system provides a solid foundation for scalable, maintainable design systems in your CMS application!
