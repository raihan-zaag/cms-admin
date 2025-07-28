# CMS Admin Tenant - Code Organization

This document outlines the current code organization and structure for future development and debugging.

## 📁 Project Structure

```
src/
├── components/           # React components organized by feature
│   ├── auth/            # Authentication components
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── common/          # Shared/reusable components
│   │   └── Resizer.tsx
│   ├── editor/          # Visual editor components
│   │   ├── design-tokens/  # Design system tokens
│   │   ├── settings/       # Component settings panels
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── GridContainer.tsx
│   │   ├── Image.tsx
│   │   ├── Text.tsx
│   │   ├── Toolbox.tsx
│   │   ├── TopBar.tsx
│   │   └── ...
│   ├── examples/        # Demo components
│   │   └── DesignTokensDemo.tsx
│   ├── layout/          # Layout components
│   │   └── DashboardLayout.tsx
│   ├── providers/       # React context providers
│   │   └── ThemeProvider.tsx
│   ├── static/          # Static rendering components
│   │   ├── RenderButton.tsx
│   │   ├── RenderContainer.tsx
│   │   ├── RenderImage.tsx
│   │   └── RenderText.tsx
│   └── ui/              # Base UI components (shadcn/ui)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ...
├── constants/           # Application constants
│   ├── api.ts          # API endpoints and HTTP status codes
│   ├── devices.ts      # Device breakpoints and zoom settings
│   ├── editor.ts       # Editor-specific constants
│   ├── layout.ts       # Layout and storage constants
│   ├── ui.ts           # UI colors, spacing, shadows
│   ├── utils.ts        # Utility functions for constants
│   └── index.ts        # Barrel export for all constants
├── contexts/            # React contexts
│   └── ThemeContext.ts
├── hooks/              # Custom React hooks
│   ├── useKeyboardShortcuts.ts
│   └── useTheme.ts
├── lib/                # Utility libraries and helpers
│   ├── convertCraftJsonToHtml.tsx  # CraftJS to HTML converter
│   ├── logger.ts                   # Logging utility
│   ├── numToMeasurement.ts         # Unit conversion utilities
│   ├── spacingUtils.ts             # Spacing helper functions
│   ├── token-processor.ts          # Design token processor
│   ├── utils.ts                    # General utilities
│   └── withDesignTokens.tsx        # HOC for design tokens
├── pages/              # Page-level components
│   ├── Dashboard.tsx
│   ├── DesignTokensDemo.tsx
│   ├── MediaManager.tsx
│   ├── PageEditor.tsx
│   ├── PagesList.tsx
│   └── PagePreview.tsx
├── services/           # External service integrations
│   └── api.ts          # API service layer
├── store/              # State management (Zustand)
│   ├── auth.ts         # Authentication state
│   ├── design-tokens.ts # Design tokens state
│   └── layout.ts       # Layout and history state
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## 🏗️ Architecture Patterns

### Component Organization
- **Feature-based**: Components are grouped by their primary purpose
- **Hierarchical**: UI components are separated from business logic components
- **Reusable**: Common components are extracted to the `common/` directory

### State Management
- **Zustand**: Used for global state management
- **React Hook Form**: Used for form state management
- **Local State**: Used for component-specific state

### Routing
- **React Router**: Declarative routing with protected routes
- **Nested Routes**: Dashboard layout wraps protected pages
- **Route Guards**: `ProtectedRoute` component handles authentication

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Pre-built component library
- **Design Tokens**: Centralized design system constants

## 🔧 Development Guidelines

### Import Organization
```tsx
// External libraries (React, third-party)
import React from 'react';
import { useEditor } from '@craftjs/core';

// Internal utilities and services
import { logger } from '@/lib/logger';
import { apiService } from '@/services/api';

// Components (organized by scope)
import { Button } from '@/components/ui/button';
import { Container } from './Container';

// Constants and types
import { EDITOR_SETTINGS } from '@/constants/editor';
import type { ComponentProps } from './types';
```

### Logging
- Use `logger` utility instead of `console.log`
- `logger.debug()` for development information
- `logger.info()` for general information
- `logger.warn()` for warnings
- `logger.error()` for errors

### Constants Usage
```tsx
// ✅ Good - Use constants
import { EDITOR_SETTINGS } from '@/constants/editor';
const gridSize = EDITOR_SETTINGS.GRID.SIZE;

// ❌ Bad - Magic numbers
const gridSize = 20;
```

### Component Structure
```tsx
/**
 * Component documentation
 */
interface ComponentProps {
  // Props definition
}

const Component: React.FC<ComponentProps> = ({ ...props }) => {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
};

export default Component;
```

## 🧪 Testing Strategy

### File Organization
- Place test files adjacent to source files with `.test.tsx` suffix
- Use `__tests__` directories for complex test suites
- Mock external dependencies in `__mocks__` directories

### Testing Libraries
- **Vitest**: Test runner
- **React Testing Library**: Component testing
- **MSW**: API mocking

## 📦 Build and Deployment

### Scripts
- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run lint`: ESLint checks
- `npm run preview`: Preview production build

### Environment Variables
- `VITE_API_BASE_URL`: API endpoint
- `VITE_DEBUG`: Enable debug logging

## 🔄 Refactoring Notes

### Recent Improvements
1. **Consolidated utility functions**: Removed duplicated functions between `Resizer.tsx` and `numToMeasurement.ts`
2. **Improved logging**: Replaced `console.log` with structured logging utility
3. **Organized imports**: Grouped imports logically with comments
4. **Added documentation**: JSDoc comments for major components
5. **Removed unused components**: Cleaned up example and debug components
6. **Structured constants**: Centralized all configuration values

### Future Improvements
1. **Type safety**: Add more comprehensive TypeScript types
2. **Component composition**: Extract more reusable component patterns
3. **Performance**: Implement React.memo for expensive components
4. **Accessibility**: Add ARIA labels and keyboard navigation
5. **Testing**: Increase test coverage
6. **Documentation**: Add Storybook for component documentation

## 🚀 Getting Started

1. **Install dependencies**: `npm install`
2. **Start development server**: `npm run dev`
3. **Open browser**: Navigate to `http://localhost:5173`
4. **Read the code**: Start with `App.tsx` to understand the routing structure
5. **Check constants**: Review `src/constants/` for configuration values
6. **Explore components**: Look at `src/components/editor/` for main functionality

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [CraftJS Documentation](https://craft.js.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [Vite Documentation](https://vitejs.dev/)
