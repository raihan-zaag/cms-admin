# Global Design Token System for Craft.js Editor

This implementation provides a comprehensive global design token system that applies to the root container of the Craft.js editor, with settings that cascade to all child components.

## 🎯 Overview

The global design token system allows you to:
- Set global defaults for fonts, colors, spacing, container width, border radius, etc.
- Apply these settings to the root container which then cascades to all components
- Maintain consistency across your entire page design
- Switch themes globally
- Export/import design token configurations

## 🏗️ Architecture

### Core Components

1. **`RootContainer`** (`src/components/editor/RootContainer.tsx`)
   - Special container component that serves as the root of the Craft.js canvas
   - Applies global design token settings when `useGlobalTokens={true}`
   - Provides fallback to manual settings when global tokens are disabled

2. **`DesignTokensProvider`** (`src/components/providers/DesignTokensProvider.tsx`)
   - React context provider that manages global design token state
   - Wraps the entire editor to provide global settings

3. **`GlobalDesignTokensPanel`** (`src/components/editor/GlobalDesignTokensPanel.tsx`)
   - Main UI for configuring global design token settings
   - Organized in tabs: Typography, Colors, Spacing, Layout, Container, Guide

4. **`useGlobalDesignTokens`** (`src/hooks/useGlobalDesignTokens.ts`)
   - Custom hook for accessing and updating global design token settings
   - Provides type-safe interface for global token management

### Settings Structure

```typescript
interface GlobalDesignTokenSettings {
  // Typography defaults
  fontFamily: {
    primary: string;    // e.g., '@typography.primary'
    secondary: string;  // e.g., '@typography.secondary'
    mono: string;      // e.g., '@typography.mono'
  };
  
  // Color defaults
  colors: {
    background: string; // e.g., '@color.background'
    surface: string;    // e.g., '@color.surface'
    primary: string;    // e.g., '@color.primary'
    secondary: string;  // e.g., '@color.secondary'
    text: string;       // e.g., '@color.text'
    textMuted: string;  // e.g., '@color.textMuted'
    border: string;     // e.g., '@color.border'
  };
  
  // Spacing defaults
  spacing: {
    containerPadding: string; // e.g., '@spacing.lg'
    componentGap: string;     // e.g., '@spacing.md'
    sectionSpacing: string;   // e.g., '@spacing.xl'
  };
  
  // Container defaults
  container: {
    maxWidth: string;    // e.g., '@container.xl'
    padding: string;     // e.g., '@spacing.lg'
    borderRadius: string; // e.g., '@radius.md'
  };
  
  // Layout defaults
  layout: {
    flexDirection: 'row' | 'column';
    justifyContent: string;
    alignItems: string;
    gap: string;
  };
}
```

## 🚀 Usage

### 1. Basic Setup

The system is already integrated into the `PageEditor`. The root container is automatically configured to use global design tokens:

```tsx
<Element
  is={RootContainer}
  canvas
  useGlobalTokens={true}
  background="@color.background"
  width="100%"
  height="auto"
>
</Element>
```

### 2. Accessing Global Settings

Use the floating "DS" button in the bottom-left corner of the editor to open the Design Tokens System modal. Navigate to the "Global Settings" tab to configure global design tokens.

### 3. Configuring Global Settings

The global settings panel provides organized tabs for different aspects:

- **Typography**: Set primary and secondary font families
- **Colors**: Configure background, text, primary, and border colors
- **Spacing**: Set container padding, component gaps, and section spacing
- **Layout**: Configure layout direction, content justification, and alignment
- **Container**: Set maximum width, padding, and border radius
- **Guide**: Learn how to use the system effectively

### 4. Programmatic Access

```tsx
import { useGlobalDesignTokens } from '@/hooks/useGlobalDesignTokens';

function MyComponent() {
  const { globalSettings, updateGlobalSettings, resetGlobalSettings } = useGlobalDesignTokens();
  
  // Update specific settings
  const updateColors = () => {
    updateGlobalSettings({
      colors: {
        ...globalSettings.colors,
        background: '@color.surface'
      }
    });
  };
  
  return (
    <div>
      <button onClick={updateColors}>Change Background</button>
      <button onClick={resetGlobalSettings}>Reset All</button>
    </div>
  );
}
```

## 🎨 Design Token Reference

All global settings use design token references that start with `@`. These are processed by the theme system:

### Typography Tokens
- `@typography.primary` - Primary font family
- `@typography.secondary` - Secondary font family
- `@typography.mono` - Monospace font family

### Color Tokens
- `@color.background` - Main background color
- `@color.surface` - Surface/card background color
- `@color.primary` - Primary brand color
- `@color.secondary` - Secondary brand color
- `@color.text` - Main text color
- `@color.textMuted` - Muted text color
- `@color.border` - Border color

### Spacing Tokens
- `@spacing.xs` - Extra small (4px)
- `@spacing.sm` - Small (8px)
- `@spacing.md` - Medium (16px)
- `@spacing.lg` - Large (24px)
- `@spacing.xl` - Extra large (32px)
- `@spacing.2xl` - 2X Large (40px)

### Container Tokens
- `@container.sm` - Small container (640px)
- `@container.md` - Medium container (768px)
- `@container.lg` - Large container (1024px)
- `@container.xl` - Extra large container (1280px)
- `@container.2xl` - 2X Large container (1400px)
- `@container.full` - Full width container

### Border Radius Tokens
- `@radius.none` - No radius (0px)
- `@radius.sm` - Small radius (2px)
- `@radius.md` - Medium radius (6px)
- `@radius.lg` - Large radius (8px)
- `@radius.xl` - Extra large radius (12px)
- `@radius.full` - Full radius (9999px)

## 🔄 How It Works

1. **Global Settings Configuration**: Users configure global design token settings through the UI
2. **Root Container Application**: The `RootContainer` component applies these global settings as CSS styles
3. **Token Processing**: Design token references (e.g., `@color.primary`) are processed by the theme system
4. **Cascading Effect**: Since the root container sets font-family and other inheritable properties, child components automatically inherit these styles
5. **Override Capability**: Individual components can still override global settings when needed

## 📦 File Structure

```
src/
├── components/
│   ├── editor/
│   │   ├── RootContainer.tsx                    # Root container component
│   │   ├── GlobalDesignTokensPanel.tsx         # Global settings UI
│   │   ├── design-tokens/
│   │   │   └── GlobalDesignTokensUsageGuide.tsx # Usage documentation
│   │   └── settings/
│   │       └── RootContainerSettings.tsx       # Root container settings panel
│   └── providers/
│       └── DesignTokensProvider.tsx             # Global context provider
├── hooks/
│   ├── useGlobalDesignTokens.ts                 # Global settings hook
│   └── useDesignTokens.ts                       # Combined design tokens hook
└── pages/
    └── PageEditor.tsx                           # Updated to use global system
```

## 🎯 Benefits

1. **Consistency**: Ensures all components follow the same design system
2. **Efficiency**: Change global settings once to update the entire design
3. **Flexibility**: Individual components can still override when needed
4. **Maintainability**: Centralized design system management
5. **Theming**: Easy theme switching with global impact
6. **Export/Import**: Save and reuse design configurations

## 🔧 Customization

### Adding New Global Settings

1. Update the `GlobalDesignTokenSettings` interface
2. Add the new setting to `defaultGlobalSettings`
3. Update the UI in `GlobalDesignTokensPanel.tsx`
4. Modify `RootContainer.tsx` to apply the new setting

### Creating Custom Design Tokens

Add new tokens to the design tokens store (`src/store/design-tokens.ts`) and reference them in global settings using the `@token.name` format.

## 🚨 Important Notes

- Global design tokens only apply when `useGlobalTokens={true}` on the root container
- Individual components can override global settings by specifying their own values
- The system works with both light and dark themes
- Always use design token references (starting with `@`) for consistency
- Export your settings before making major changes for backup purposes

This system provides a comprehensive foundation for maintaining design consistency across your Craft.js editor while still allowing for component-level customization when needed.
