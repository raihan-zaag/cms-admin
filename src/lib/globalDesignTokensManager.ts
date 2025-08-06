/**
 * Improved global state management with cleanup
 * 
 * This keeps your current approach but adds stability improvements
 */

// Store global design tokens for use by render components
let currentGlobalDesignTokens: any = null;
let cleanupTimer: NodeJS.Timeout | null = null;

export function setGlobalDesignTokensForRender(tokens: any) {
  currentGlobalDesignTokens = tokens;
  
  // Auto-cleanup after 5 minutes to prevent memory leaks
  if (cleanupTimer) {
    clearTimeout(cleanupTimer);
  }
  
  cleanupTimer = setTimeout(() => {
    currentGlobalDesignTokens = null;
    cleanupTimer = null;
  }, 5 * 60 * 1000); // 5 minutes
}

export function getGlobalDesignTokensForRender() {
  return currentGlobalDesignTokens;
}

export function clearGlobalDesignTokensForRender() {
  currentGlobalDesignTokens = null;
  if (cleanupTimer) {
    clearTimeout(cleanupTimer);
    cleanupTimer = null;
  }
}

// Cleanup when page unloads
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', clearGlobalDesignTokensForRender);
}
