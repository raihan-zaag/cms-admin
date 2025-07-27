// Layout related constants
export const LAYOUT_SETTINGS = {
  // Sidebar dimensions
  SIDEBAR: {
    WIDTH: 280,
    COLLAPSED_WIDTH: 64
  },
  
  // Header/Navigation
  HEADER: {
    HEIGHT: 64,
    Z_INDEX: 50
  },
  
  // Content area
  CONTENT: {
    MAX_WIDTH: 1200,
    PADDING: 24
  },
  
  // History settings
  HISTORY: {
    MAX_ITEMS: 50,
    UNDO_REDO_LIMIT: 20
  }
} as const;

// Page statuses
export const PAGE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
} as const;

// Storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  PREVIEW_DATA: (id: string) => `preview-${id}`,
  LAYOUT_STATE: 'layout_state',
  EDITOR_SETTINGS: 'editor_settings'
} as const;

// Modal/Dialog settings
export const MODAL_SETTINGS = {
  BACKDROP_BLUR: 'backdrop-blur-sm',
  OVERLAY_COLOR: 'bg-black/50',
  ANIMATION_DURATION: 300,
  Z_INDEX: 100
} as const;
