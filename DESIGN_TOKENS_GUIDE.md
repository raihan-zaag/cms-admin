# How Design Tokens Work with Craft.js Components

## Overview
The design tokens system I've implemented allows you to use token references like `@color.primary`, `@typography.base`, `@radius.md` directly in your Craft.js components. Here's how it works:

## 1. Token Processing in Components

### Button Component Example
```typescript
// In Button.tsx, tokens are processed like this:
const processedBackgroundColor = useDesignTokens && typeof backgroundColor === 'string' && backgroundColor.startsWith('@')
  ? processToken(backgroundColor)  // Converts @color.primary to actual color value
  : backgroundColor;               // Uses raw value if not a token

const processedBorderRadius = useDesignTokens && typeof borderRadius === 'string' && borderRadius.startsWith('@')
  ? processToken(borderRadius)     // Converts @radius.md to actual pixel value
  : typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
```

### Text Component Example
```typescript
// In Text.tsx, similar processing:
const processedFontSize = useDesignTokens && typeof fontSize === 'string' && fontSize.startsWith('@')
  ? processToken(fontSize)         // Converts @typography.base to actual font size
  : typeof fontSize === 'number' ? `${fontSize}px` : fontSize;

const processedColor = useDesignTokens && typeof color === 'string' && color.startsWith('@')
  ? processToken(color)            // Converts @color.text to actual color
  : color;
```

## 2. Using Tokens in Craft.js Editor

### Adding Components with Tokens
```typescript
// When you add a Button to the canvas, it uses default token values:
const buttonNode = {
  type: Button,
  props: {
    text: "Click me",
    backgroundColor: "@color.primary",    // Uses primary color token
    color: "white",
    fontSize: "@typography.base",         // Uses base typography token
    borderRadius: "@radius.md",           // Uses medium radius token
    useDesignTokens: true                 // Enables token processing
  }
};
```

### Settings Panel Integration
The ButtonSettings and TextSettings panels now include:
- **Toggle for Design Tokens**: Enable/disable token processing
- **Token Dropdowns**: Select from available tokens instead of raw values
- **Real-time Updates**: Changes reflect immediately in the canvas

## 3. Real-time Token Updates

When you change a token value in the Design Tokens modal:
1. The Zustand store updates the token value
2. All components using that token automatically re-render
3. The `processToken()` function returns the new value
4. Components update their styling in real-time

## 4. Practical Usage in Your Editor

### Step 1: Open Design Tokens Modal
- Click the floating "Design Tokens" button (bottom-left of editor)
- Modify color, typography, spacing, or radius tokens

### Step 2: Add Components to Canvas
- Drag Button or Text components from the toolbox
- They will use default token values (e.g., @color.primary)

### Step 3: Customize via Settings Panel
- Select a component on the canvas
- In the settings panel, choose "Use Design Tokens"
- Select tokens from dropdowns instead of entering raw values

### Step 4: See Real-time Updates
- Change token values in the Design Tokens modal
- Watch all components using those tokens update instantly

## 5. Token Syntax Reference

### Color Tokens
- `@color.primary` → Primary brand color
- `@color.secondary` → Secondary color
- `@color.text` → Default text color
- `@color.success` → Success state color
- `@color.warning` → Warning state color
- `@color.error` → Error state color

### Typography Tokens
- `@typography.xs` → Extra small font size
- `@typography.sm` → Small font size
- `@typography.base` → Base font size
- `@typography.lg` → Large font size
- `@typography.xl` → Extra large font size

### Radius Tokens
- `@radius.none` → No border radius (0px)
- `@radius.sm` → Small radius (4px)
- `@radius.md` → Medium radius (8px)
- `@radius.lg` → Large radius (12px)
- `@radius.full` → Full radius (50%)

### Spacing Tokens
- `@spacing.xs` → Extra small spacing
- `@spacing.sm` → Small spacing
- `@spacing.md` → Medium spacing
- `@spacing.lg` → Large spacing
- `@spacing.xl` → Extra large spacing

## 6. Theme Support

The system supports light/dark themes:
- Each color token has both light and dark values
- Theme switching updates all token-based components
- Components automatically use the correct theme values

## 7. Benefits

1. **Consistency**: All components use the same design values
2. **Maintainability**: Change one token to update everywhere
3. **Flexibility**: Mix tokens with raw values as needed
4. **Real-time**: See changes instantly without rebuilding
5. **Theme Support**: Automatic light/dark mode switching

This system transforms your Craft.js editor into a design system-aware page builder where design consistency is maintained automatically through centralized token management.
