# Constants Documentation

This directory contains all the constant values used throughout the application to maintain consistency and avoid hardcoded values.

## Structure

- **`index.ts`** - Main entry point that exports all constants
- **`devices.ts`** - Device breakpoints, viewport sizes, zoom settings, and keyboard shortcuts
- **`ui.ts`** - UI colors, spacing, border radius, shadows, and animations
- **`api.ts`** - API endpoints, HTTP status codes, and request timeouts
- **`editor.ts`** - Editor-specific settings for grid, selection, components, and canvas
- **`layout.ts`** - Layout dimensions, page statuses, storage keys, and modal settings

## Usage

```typescript
// Import from main entry point
import { DEVICE_BREAKPOINTS, ZOOM_SETTINGS, UI_COLORS } from '@/constants';

// Or import from specific files
import { DEVICE_BREAKPOINTS } from '@/constants/devices';
import { UI_COLORS } from '@/constants/ui';
```

## Benefits

1. **Consistency** - All magic numbers and strings are centralized
2. **Maintainability** - Easy to update values across the entire application
3. **Type Safety** - TypeScript ensures correct usage of constant values
4. **Debugging** - No more hunting for hardcoded values throughout the codebase
5. **Documentation** - Constants serve as documentation for intended values

## Convention

- Use UPPER_SNAKE_CASE for constant names
- Group related constants in logical objects
- Use `as const` to ensure literal types
- Provide comments for complex or non-obvious constants
- Keep constants pure (no function calls or complex expressions)

## Examples

```typescript
// Device breakpoints
const mobileStyles = `w-[${DEVICE_BREAKPOINTS.MOBILE.WIDTH}px]`;

// Zoom controls
const zoomIn = () => setZoom(prev => Math.min(prev + ZOOM_SETTINGS.STEP, ZOOM_SETTINGS.MAX));

// Status colors
const statusClass = status === 'published' 
  ? `${UI_COLORS.STATUS.PUBLISHED.BACKGROUND} ${UI_COLORS.STATUS.PUBLISHED.TEXT}`
  : `${UI_COLORS.STATUS.DRAFT.BACKGROUND} ${UI_COLORS.STATUS.DRAFT.TEXT}`;
```
