// UI Colors and Theme
export const UI_COLORS = {
  // Status colors
  STATUS: {
    PUBLISHED: {
      BACKGROUND: 'bg-green-100',
      TEXT: 'text-green-800'
    },
    DRAFT: {
      BACKGROUND: 'bg-amber-100', 
      TEXT: 'text-amber-800'
    },
    ERROR: {
      BACKGROUND: 'bg-red-100',
      TEXT: 'text-red-800',
      BORDER: 'border-red-200'
    }
  },
  
  // Background gradients
  GRADIENTS: {
    MAIN: 'bg-gradient-to-br from-gray-50 to-gray-100',
    LIGHT: 'bg-gray-50'
  },
  
  // Interactive elements
  INTERACTIVE: {
    PRIMARY: 'text-blue-600 hover:text-blue-700',
    SECONDARY: 'text-gray-600 hover:text-gray-900',
    BACKGROUND_HOVER: 'hover:bg-gray-50'
  },
  
  // Borders
  BORDERS: {
    LIGHT: 'border-gray-200',
    MEDIUM: 'border-gray-300',
    DARK: 'border-gray-600'
  }
} as const;

// Layout spacing
export const SPACING = {
  // Padding
  PADDING: {
    XS: 1,
    SM: 2, 
    MD: 4,
    LG: 6,
    XL: 8,
    XXL: 12
  },
  
  // Margins
  MARGIN: {
    XS: 1,
    SM: 2,
    MD: 4, 
    LG: 6,
    XL: 8,
    XXL: 12
  },
  
  // Gaps
  GAP: {
    XS: 1,
    SM: 2,
    MD: 4,
    LG: 6,
    XL: 8,
    XXL: 12
  }
} as const;

// Border radius values
export const BORDER_RADIUS = {
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 20,
  ROUND: 9999
} as const;

// Shadow classes
export const SHADOWS = {
  SM: 'shadow-sm',
  MD: 'shadow-md', 
  LG: 'shadow-lg',
  XL: 'shadow-xl',
  NONE: 'shadow-none'
} as const;

// Animation durations
export const ANIMATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500
} as const;
