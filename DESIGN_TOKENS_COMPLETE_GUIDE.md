# Complete Guide: Using Design Tokens in Craft.js Editor

## 🎯 Overview

This guide shows you exactly how to use **Typography**, **Spacing**, **Border Radius**, **Breakpoints**, and **Container** tokens in your Craft.js editor components.

## 🎨 1. Color Tokens

### Available Tokens:
- `@color.primary` - Primary brand color
- `@color.secondary` - Secondary color  
- `@color.success` - Success state color
- `@color.warning` - Warning state color
- `@color.error` - Error state color
- `@color.accent` - Accent color
- `@color.text` - Default text color
- `@color.background` - Background color
- `@color.muted` - Muted/disabled color

### Usage in Components:
```tsx
// Button component
<Button 
  backgroundColor="@color.primary"
  color="@color.text"
  useDesignTokens={true}
/>

// Text component
<Text 
  color="@color.text"
  useDesignTokens={true}
/>

// Container component
<Container 
  background="@color.background"
  useDesignTokens={true}
/>
```

---

## 📝 2. Typography Tokens

### Available Tokens:
- `@typography.xs` - Extra small font (12px)
- `@typography.sm` - Small font (14px)
- `@typography.base` - Base font (16px)
- `@typography.lg` - Large font (18px)
- `@typography.xl` - Extra large font (24px)
- `@typography.2xl` - 2X large font (32px)
- `@typography.primary` - Primary font family
- `@typography.secondary` - Secondary font family
- `@typography.mono` - Monospace font family

### Usage in Text Component:
```tsx
<Text 
  text="Heading Text"
  fontSize="@typography.xl"
  fontFamily="@typography.primary"
  color="@color.text"
  useDesignTokens={true}
/>

<Text 
  text="Body text"
  fontSize="@typography.base"
  fontFamily="@typography.primary"
  useDesignTokens={true}
/>

<Text 
  text="Small caption"
  fontSize="@typography.sm"
  color="@color.muted"
  useDesignTokens={true}
/>
```

### Usage in Button Component:
```tsx
<Button 
  text="Large Button"
  fontSize="@typography.lg"
  backgroundColor="@color.primary"
  useDesignTokens={true}
/>

<Button 
  text="Small Button"
  fontSize="@typography.sm"
  backgroundColor="@color.secondary"
  useDesignTokens={true}
/>
```

---

## 📏 3. Spacing Tokens

### Available Tokens:
- `@spacing.xs` - Extra small (4px)
- `@spacing.sm` - Small (8px)
- `@spacing.md` - Medium (16px)
- `@spacing.lg` - Large (24px)
- `@spacing.xl` - Extra large (32px)
- `@spacing.2xl` - 2X large (48px)

### Usage in Container Component:
```tsx
<Container 
  paddingTop="@spacing.lg"
  paddingRight="@spacing.lg"
  paddingBottom="@spacing.lg"
  paddingLeft="@spacing.lg"
  marginTop="@spacing.md"
  marginBottom="@spacing.md"
  gap="@spacing.md"
  useDesignTokens={true}
>
  {/* Child components */}
</Container>

// Compact container
<Container 
  paddingTop="@spacing.sm"
  paddingRight="@spacing.sm"
  paddingBottom="@spacing.sm"
  paddingLeft="@spacing.sm"
  gap="@spacing.sm"
  useDesignTokens={true}
/>

// Spacious container
<Container 
  paddingTop="@spacing.xl"
  paddingRight="@spacing.xl"
  paddingBottom="@spacing.xl"
  paddingLeft="@spacing.xl"
  gap="@spacing.lg"
  useDesignTokens={true}
/>
```

### Usage in Button Component:
```tsx
<Button 
  text="Compact Button"
  padding="@spacing.sm"
  useDesignTokens={true}
/>

<Button 
  text="Comfortable Button"
  padding="@spacing.lg"
  useDesignTokens={true}
/>
```

---

## 🔄 4. Border Radius Tokens

### Available Tokens:
- `@radius.none` - No radius (0px)
- `@radius.sm` - Small radius (4px)
- `@radius.md` - Medium radius (8px)
- `@radius.lg` - Large radius (12px)
- `@radius.xl` - Extra large radius (16px)
- `@radius.full` - Full radius (50% - creates circles/pills)

### Usage in Button Component:
```tsx
<Button 
  text="Square Button"
  borderRadius="@radius.none"
  backgroundColor="@color.primary"
  useDesignTokens={true}
/>

<Button 
  text="Rounded Button"
  borderRadius="@radius.md"
  backgroundColor="@color.secondary"
  useDesignTokens={true}
/>

<Button 
  text="Pill Button"
  borderRadius="@radius.full"
  backgroundColor="@color.accent"
  useDesignTokens={true}
/>
```

### Usage in Container Component:
```tsx
<Container 
  radius="@radius.lg"
  background="@color.background"
  useDesignTokens={true}
>
  <Text text="Content inside rounded container" />
</Container>
```

---

## 📦 5. Container Tokens

### Available Tokens:
- `@container.xs` - Extra small (320px)
- `@container.sm` - Small (480px)
- `@container.md` - Medium (768px)
- `@container.lg` - Large (1024px)
- `@container.xl` - Extra large (1280px)
- `@container.full` - Full width (100%)

### Usage in Container Component:
```tsx
// Card container
<Container 
  width="@container.sm"
  background="@color.background"
  paddingTop="@spacing.lg"
  paddingRight="@spacing.lg"
  paddingBottom="@spacing.lg"
  paddingLeft="@spacing.lg"
  radius="@radius.md"
  useDesignTokens={true}
>
  <Text text="Card content" />
</Container>

// Main content container
<Container 
  width="@container.lg"
  background="@color.background"
  paddingTop="@spacing.xl"
  paddingRight="@spacing.xl"
  paddingBottom="@spacing.xl"
  paddingLeft="@spacing.xl"
  useDesignTokens={true}
>
  <Text text="Main content area" />
</Container>

// Full-width section
<Container 
  width="@container.full"
  background="@color.muted"
  paddingTop="@spacing.lg"
  paddingBottom="@spacing.lg"
  useDesignTokens={true}
>
  <Text text="Full-width section" />
</Container>
```

---

## 🚀 6. Practical Examples

### Hero Section:
```tsx
<Container 
  width="@container.xl"
  background="@color.primary"
  paddingTop="@spacing.2xl"
  paddingBottom="@spacing.2xl"
  paddingLeft="@spacing.lg"
  paddingRight="@spacing.lg"
  useDesignTokens={true}
>
  <Text 
    text="Welcome to Our Platform"
    fontSize="@typography.2xl"
    fontFamily="@typography.primary"
    color="white"
    useDesignTokens={true}
  />
  <Text 
    text="Discover amazing features and capabilities"
    fontSize="@typography.lg"
    color="white"
    useDesignTokens={true}
  />
  <Button 
    text="Get Started"
    backgroundColor="white"
    color="@color.primary"
    fontSize="@typography.base"
    borderRadius="@radius.md"
    padding="@spacing.lg"
    useDesignTokens={true}
  />
</Container>
```

### Card Grid:
```tsx
<Container 
  width="@container.lg"
  gap="@spacing.lg"
  flexDirection="row"
  flexWrap="wrap"
  useDesignTokens={true}
>
  <Container 
    width="@container.sm"
    background="@color.background"
    paddingTop="@spacing.lg"
    paddingRight="@spacing.lg"
    paddingBottom="@spacing.lg"
    paddingLeft="@spacing.lg"
    radius="@radius.lg"
    useDesignTokens={true}
  >
    <Text 
      text="Card Title"
      fontSize="@typography.lg"
      fontWeight="bold"
      color="@color.text"
      useDesignTokens={true}
    />
    <Text 
      text="Card description text"
      fontSize="@typography.base"
      color="@color.muted"
      useDesignTokens={true}
    />
    <Button 
      text="Learn More"
      backgroundColor="@color.accent"
      color="white"
      borderRadius="@radius.md"
      useDesignTokens={true}
    />
  </Container>
</Container>
```

---

## 🔧 7. How to Use in Craft.js Editor

### Step 1: Enable Design Tokens
1. Select any component in the canvas
2. In the settings panel, check "Use Design Tokens"
3. Now you can use token strings instead of raw values

### Step 2: Using Token Dropdowns
1. When "Use Design Tokens" is enabled
2. Color fields become dropdowns with available color tokens
3. Size fields show spacing/typography token options
4. Radius fields show border radius token options

### Step 3: Real-time Updates
1. Open the Design Tokens modal (bottom-left floating button)
2. Change any token value
3. Watch all components using that token update instantly

### Step 4: Theme Switching
1. Use the theme switcher in the Design Tokens modal
2. Components automatically switch to light/dark color values
3. All other tokens remain consistent across themes

---

## ✅ 8. Benefits of Using Design Tokens

1. **Consistency**: All components use the same design values
2. **Maintainability**: Change one token to update everywhere
3. **Flexibility**: Mix tokens with raw values as needed
4. **Real-time**: See changes instantly without rebuilding
5. **Theme Support**: Automatic light/dark mode switching
6. **Type Safety**: Token references are validated at runtime
7. **Design System**: Enforces design standards automatically

---

## 🎯 9. Token Naming Convention

All tokens follow the format: `@category.name`

- **@color.*** - Color tokens
- **@typography.*** - Typography tokens  
- **@spacing.*** - Spacing tokens
- **@radius.*** - Border radius tokens
- **@container.*** - Container width tokens

This makes it easy to remember and use tokens consistently across your components.

---

## 🔄 10. Real-time Token Updates

When you change a token value in the Design Tokens modal:

1. The Zustand store updates the token value
2. All components using that token re-render automatically
3. The `processToken()` function returns the new value
4. Components update their styling in real-time
5. Changes persist across browser sessions

This creates a powerful design system where changes propagate instantly throughout your entire page layout.
