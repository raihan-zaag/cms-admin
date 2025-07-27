# Constants Migration Guide

This guide shows how to replace hardcoded values with constants throughout your application.

## ✅ What We've Accomplished

We've successfully created a comprehensive constants system and refactored several key files:

### 1. **Created Constants Structure**
- `src/constants/devices.ts` - Device breakpoints, zoom settings, keyboard shortcuts
- `src/constants/ui.ts` - Colors, spacing, shadows, animations
- `src/constants/api.ts` - API endpoints and configurations
- `src/constants/editor.ts` - Editor-specific settings
- `src/constants/layout.ts` - Layout dimensions and storage keys
- `src/constants/utils.ts` - Helper functions for working with constants

### 2. **Refactored Components**
- ✅ `PagePreview.tsx` - Full refactor with all device, zoom, and UI constants
- ✅ `Container.tsx` - Updated selection borders using editor constants
- ✅ `Viewport.tsx` - Grid background using editor constants

## 🔄 Before vs After Examples

### Device Breakpoints
```typescript
// ❌ Before (hardcoded)
const getDeviceStyles = () => {
  switch (currentDevice) {
    case 'mobile':
      return `w-[375px] max-w-[375px] border-8 border-gray-800 rounded-[24px]`;
    case 'tablet':
      return `w-[768px] max-w-[768px] border-4 border-gray-600 rounded-[20px]`;
    case 'desktop':
      return `w-full max-w-[1580px] border border-gray-200 rounded-xl`;
  }
};

// ✅ After (using constants)
const getDeviceStyles = () => {
  switch (currentDevice) {
    case 'mobile': {
      const mobile = DEVICE_BREAKPOINTS.MOBILE;
      return `w-[${mobile.WIDTH}px] max-w-[${mobile.MAX_WIDTH}px] border-${mobile.BORDER_WIDTH} ${mobile.BORDER_COLOR} rounded-[${mobile.BORDER_RADIUS}px]`;
    }
    // ... similar for tablet and desktop
  }
};
```

### Zoom Controls
```typescript
// ❌ Before (hardcoded)
const zoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
const zoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
const resetZoom = () => setZoom(100);

// ✅ After (using constants)
const zoomIn = () => setZoom(prev => Math.min(prev + ZOOM_SETTINGS.STEP, ZOOM_SETTINGS.MAX));
const zoomOut = () => setZoom(prev => Math.max(prev - ZOOM_SETTINGS.STEP, ZOOM_SETTINGS.MIN));
const resetZoom = () => setZoom(ZOOM_SETTINGS.DEFAULT);
```

### Status Colors
```typescript
// ❌ Before (hardcoded)
<span className={`px-3 py-1 rounded-full ${
  status === 'published' 
    ? 'bg-green-100 text-green-800' 
    : 'bg-amber-100 text-amber-800'
}`}>

// ✅ After (using constants)
<span className={`px-3 py-1 rounded-full ${
  status === 'published' 
    ? `${UI_COLORS.STATUS.PUBLISHED.BACKGROUND} ${UI_COLORS.STATUS.PUBLISHED.TEXT}` 
    : `${UI_COLORS.STATUS.DRAFT.BACKGROUND} ${UI_COLORS.STATUS.DRAFT.TEXT}`
}`}>
```

## 🚀 Next Steps for Complete Migration

### 1. **Authentication Forms** (`src/components/auth/`)
```typescript
// Files to update:
- LoginForm.tsx
- RegisterForm.tsx

// Constants to use:
- UI_COLORS.STATUS.ERROR for error messages
- UI_COLORS.INTERACTIVE.PRIMARY for links
- SPACING values for consistent padding/margins
```

### 2. **Dashboard Layout** (`src/components/layout/DashboardLayout.tsx`)
```typescript
// Replace hardcoded:
- Navigation hover colors: 'hover:bg-gray-100' → UI_COLORS.INTERACTIVE.BACKGROUND_HOVER
- Background colors: 'bg-gray-50' → UI_COLORS.GRADIENTS.LIGHT
- Spacing values with SPACING constants
```

### 3. **Editor Components** (`src/components/editor/`)
```typescript
// Files to update:
- Button.tsx, Text.tsx, Image.tsx
- LayersPanel.tsx, Toolbox.tsx, SettingsPanel.tsx

// Constants to use:
- EDITOR_SETTINGS for component dimensions
- UI_COLORS for interactive states
- SPACING for consistent layouts
```

### 4. **Static Render Components** (`src/components/static/`)
```typescript
// Files to update:
- RenderButton.tsx, RenderContainer.tsx, RenderImage.tsx, RenderText.tsx

// Use EDITOR_SETTINGS and UI_COLORS constants
```

## 📋 Migration Checklist

For each file you're refactoring:

1. **Identify hardcoded values**
   ```bash
   # Search for common patterns
   grep -n "px\|#[0-9a-f]\{6\}\|gray-\|blue-\|green-" YourFile.tsx
   ```

2. **Add appropriate constant imports**
   ```typescript
   import { DEVICE_BREAKPOINTS, ZOOM_SETTINGS } from '@/constants/devices';
   import { UI_COLORS, SPACING } from '@/constants/ui';
   import { EDITOR_SETTINGS } from '@/constants/editor';
   ```

3. **Replace hardcoded values systematically**
   - Start with the most frequently used values
   - Test after each replacement
   - Use utility functions where helpful

4. **Verify no functionality is broken**
   ```bash
   npm run build  # Check for TypeScript errors
   npm run dev    # Test in browser
   ```

## 🛠️ Utility Functions

Use the helper functions in `constants/utils.ts`:

```typescript
// Get device configuration
const deviceConfig = getDeviceClass('mobile');
// Returns: { width: 375, maxWidth: 375, label: 'Mobile View', ... }

// Get status classes
const statusClasses = getStatusClasses('published');
// Returns: 'bg-green-100 text-green-800'

// Validate zoom level
const validZoom = validateZoom(250); // Returns: 200 (clamped to max)
```

## 📊 Benefits Achieved

1. **🎯 Consistency** - All components use the same values
2. **🔧 Maintainability** - Change values in one place
3. **🐛 Debugging** - Easy to track down UI inconsistencies
4. **📚 Documentation** - Constants serve as documentation
5. **⚡ Type Safety** - TypeScript ensures correct usage
6. **🔄 Scalability** - Easy to add new themes or configurations

## 🎉 Current Status

- ✅ Constants structure created
- ✅ Core preview functionality refactored
- ✅ Editor components partially refactored
- ✅ Utility functions created
- ✅ Documentation and examples provided

The foundation is now in place for a fully consistent, maintainable codebase!
