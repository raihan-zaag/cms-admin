// API related constants
export const API_ENDPOINTS = {
  BASE_URL: process.env.VITE_API_BASE_URL || 'http://localhost:8000',
  
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  
  // Pages endpoints
  PAGES: {
    LIST: '/pages',
    CREATE: '/pages',
    GET: (id: string) => `/pages/${id}`,
    UPDATE: (id: string) => `/pages/${id}`,
    DELETE: (id: string) => `/pages/${id}`
  },
  
  // Media endpoints
  MEDIA: {
    UPLOAD: '/media/upload',
    LIST: '/media',
    DELETE: (id: string) => `/media/${id}`
  }
} as const;

// HTTP Status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

// Request timeouts
export const REQUEST_TIMEOUTS = {
  DEFAULT: 10000, // 10 seconds
  UPLOAD: 30000,  // 30 seconds
  LONG: 60000     // 60 seconds
} as const;
