// Device breakpoints and viewport sizes
export const DEVICE_BREAKPOINTS = {
  MOBILE: {
    WIDTH: 375,
    MAX_WIDTH: 375,
    LABEL: 'Mobile View',
    BORDER_WIDTH: 8,
    BORDER_RADIUS: 24,
    BORDER_COLOR: 'border-gray-800',
    ICON: '📲'
  },
  TABLET: {
    WIDTH: 768,
    MAX_WIDTH: 768,
    LABEL: 'Tablet View', 
    BORDER_WIDTH: 4,
    BORDER_RADIUS: 20,
    BORDER_COLOR: 'border-gray-600',
    ICON: '📱'
  },
  DESKTOP: {
    WIDTH: 1580,
    MAX_WIDTH: 1580,
    LABEL: 'Desktop View',
    BORDER_WIDTH: 1,
    BORDER_RADIUS: 12,
    BORDER_COLOR: 'border-gray-200',
    ICON: '🖥️'
  }
} as const;

// Device types
export type DeviceType = 'desktop' | 'tablet' | 'mobile';

// Zoom settings
export const ZOOM_SETTINGS = {
  DEFAULT: 100 as number,
  MIN: 50 as number,
  MAX: 200 as number,
  STEP: 25 as number
} as const;

// Preview dimensions
export const PREVIEW_DIMENSIONS = {
  HEIGHT: 800,
  VIEWPORT_PADDING: 12
} as const;

// Keyboard shortcuts
export const KEYBOARD_SHORTCUTS = {
  DESKTOP: '1',
  TABLET: '2', 
  MOBILE: '3',
  ZOOM_IN: ['+', '='],
  ZOOM_OUT: ['-'],
  RESET_ZOOM: '0',
  REFRESH: ['r', 'R']
} as const;
