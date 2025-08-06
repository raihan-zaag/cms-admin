/**
 * Improved Preview Data Manager
 * 
 * Provides better separation of concerns and type safety for preview functionality
 */

import type { GlobalDesignTokenSettings } from '@/hooks/useGlobalDesignTokens';

export interface PreviewData {
  craftJson: Record<string, any>;
  globalDesignTokens?: GlobalDesignTokenSettings;
  timestamp: number;
  version: string;
}

export class PreviewDataManager {
  private static readonly STORAGE_PREFIX = 'preview-';
  private static readonly CURRENT_VERSION = '1.0';
  private static readonly MAX_STORAGE_SIZE = 4 * 1024 * 1024; // 4MB limit

  /**
   * Save preview data to sessionStorage with validation
   */
  static save(id: string, craftJson: Record<string, any>, globalDesignTokens?: GlobalDesignTokenSettings): boolean {
    try {
      const previewData: PreviewData = {
        craftJson,
        globalDesignTokens,
        timestamp: Date.now(),
        version: this.CURRENT_VERSION
      };

      const serialized = JSON.stringify(previewData);
      
      // Check size limit
      if (serialized.length > this.MAX_STORAGE_SIZE) {
        console.warn('Preview data too large, truncating...');
        // Could implement compression or truncation here
        return false;
      }

      sessionStorage.setItem(`${this.STORAGE_PREFIX}${id}`, serialized);
      return true;
    } catch (error) {
      console.error('Failed to save preview data:', error);
      return false;
    }
  }

  /**
   * Load preview data from sessionStorage with validation
   */
  static load(id: string): PreviewData | null {
    try {
      const stored = sessionStorage.getItem(`${this.STORAGE_PREFIX}${id}`);
      if (!stored) return null;

      const data = JSON.parse(stored) as PreviewData;
      
      // Version validation
      if (data.version !== this.CURRENT_VERSION) {
        console.warn(`Preview data version mismatch. Expected ${this.CURRENT_VERSION}, got ${data.version}`);
        // Could implement migration logic here
      }

      // Age validation (prevent stale data)
      const ageMs = Date.now() - data.timestamp;
      const maxAgeMs = 24 * 60 * 60 * 1000; // 24 hours
      if (ageMs > maxAgeMs) {
        console.warn('Preview data is stale, cleaning up...');
        this.cleanup(id);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Failed to load preview data:', error);
      return null;
    }
  }

  /**
   * Cleanup old preview data
   */
  static cleanup(id?: string): void {
    try {
      if (id) {
        // Clean specific ID
        sessionStorage.removeItem(`${this.STORAGE_PREFIX}${id}`);
        return;
      }

      // Clean all old preview data
      const keysToRemove: string[] = [];
      const now = Date.now();
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key?.startsWith(this.STORAGE_PREFIX)) {
          try {
            const data = JSON.parse(sessionStorage.getItem(key) || '{}') as PreviewData;
            if (now - data.timestamp > maxAge) {
              keysToRemove.push(key);
            }
          } catch {
            // Invalid data, mark for removal
            keysToRemove.push(key);
          }
        }
      }

      keysToRemove.forEach(key => sessionStorage.removeItem(key));
      console.log(`Cleaned up ${keysToRemove.length} old preview entries`);
    } catch (error) {
      console.error('Failed to cleanup preview data:', error);
    }
  }

  /**
   * Get storage usage statistics
   */
  static getStorageStats(): { count: number; totalSize: number } {
    let count = 0;
    let totalSize = 0;

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith(this.STORAGE_PREFIX)) {
        count++;
        totalSize += (sessionStorage.getItem(key) || '').length;
      }
    }

    return { count, totalSize };
  }
}
