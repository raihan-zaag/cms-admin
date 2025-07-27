// Editor related constants
export const EDITOR_SETTINGS = {
  // Grid settings
  GRID: {
    SIZE: 20,
    COLOR: '#e5e7eb',
    OPACITY: 0.5
  },
  
  // Selection borders
  SELECTION: {
    ACTIVE_BORDER: '2px dashed #3b82f6',
    INACTIVE_BORDER: '2px solid #e5e7eb',
    BORDER_RADIUS: 4
  },
  
  // Component spacing
  COMPONENT: {
    MIN_HEIGHT: 40,
    MIN_WIDTH: 40,
    DEFAULT_PADDING: 16
  },
  
  // Toolbox
  TOOLBOX: {
    WIDTH: 280,
    ITEM_HEIGHT: 48
  },
  
  // Layers panel
  LAYERS: {
    WIDTH: 300,
    ITEM_HEIGHT: 32
  }
} as const;

// Canvas settings
export const CANVAS_SETTINGS = {
  DEFAULT_WIDTH: '100%',
  DEFAULT_HEIGHT: '100vh',
  BACKGROUND_COLOR: '#ffffff',
  ZOOM_LEVELS: [25, 50, 75, 100, 125, 150, 200]
} as const;

// Component types
export const COMPONENT_TYPES = {
  CONTAINER: 'Container',
  TEXT: 'Text', 
  IMAGE: 'Image',
  BUTTON: 'Button'
} as const;
