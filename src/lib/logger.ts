/**
 * Logging utility that respects environment settings
 * In production, logs are suppressed unless explicitly enabled
 */

const isDevelopment = import.meta.env.DEV;
const isDebugEnabled = import.meta.env.VITE_DEBUG === 'true';

export const logger = {
  /**
   * Debug logging - only shows in development or when debug is enabled
   */
  debug: (...args: any[]) => {
    if (isDevelopment || isDebugEnabled) {
      console.log('[DEBUG]', ...args);
    }
  },

  /**
   * Info logging - shows in development and production
   */
  info: (...args: any[]) => {
    console.info('[INFO]', ...args);
  },

  /**
   * Warning logging - always shows
   */
  warn: (...args: any[]) => {
    console.warn('[WARN]', ...args);
  },

  /**
   * Error logging - always shows
   */
  error: (...args: any[]) => {
    console.error('[ERROR]', ...args);
  }
};
