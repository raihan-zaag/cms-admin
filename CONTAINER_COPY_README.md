# Container Copy Component

## Overview
Created a new `ContainerCopy` component that uses the custom `Resizer` component instead of the built-in `re-resizable` library used by the original `Container` component.

## Key Features
- **Advanced Resizing**: Uses the custom `Resizer` component which provides better resize handles and visual feedback
- **Percentage/Pixel Support**: Handles both percentage and pixel-based dimensions with automatic conversion
- **Fill Space Support**: Respects the `fillSpace` prop for responsive layouts
- **Same Props**: Maintains full compatibility with the original Container component props
- **Visual Indicators**: Shows resize handles with custom styling when component is selected

## Files Created/Modified

### New File
- `src/components/editor/ContainerCopy.tsx` - The main ContainerCopy component

### Modified Files
- `src/components/editor/Toolbox.tsx` - Added ContainerCopy to the toolbox with Copy icon
- `src/pages/PageEditor.tsx` - Added ContainerCopy to the CraftJS resolver
- `src/lib/convertCraftJsonToHtml.tsx` - Added ContainerCopy mapping for static rendering

## Differences from Original Container

1. **Resizer Integration**: Uses the custom `Resizer` component that provides:
   - Custom resize handles with better visual feedback
   - Automatic percentage/pixel conversion
   - Better parent dimension tracking
   - Enhanced resize behavior with proper debouncing

2. **Simplified Structure**: 
   - Removes direct `re-resizable` dependency
   - Uses the `propKey` system for width/height management
   - Cleaner separation of concerns between resizing and styling

3. **Visual Enhancements**:
   - Custom resize handles that appear on selection
   - Better visual feedback during resize operations
   - Consistent styling with the design system

## Usage
The ContainerCopy component appears in the toolbox as "Container Copy" with a cyan gradient background and Copy icon. It can be dragged onto the canvas and used exactly like the original Container component, but with enhanced resizing capabilities.

## Props
All props are identical to the original Container component:
- Layout props: `flexDirection`, `justifyContent`, `alignItems`, `flexWrap`, `gap`
- Spacing props: `paddingTop/Right/Bottom/Left`, `marginTop/Right/Bottom/Left`
- Visual props: `background`, `isTransparent`, `shadow`, `radius`
- Sizing props: `width`, `height`, `fillSpace`
