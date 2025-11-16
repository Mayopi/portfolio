/**
 * Cache utility with localStorage persistence and expiration support
 */

export interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export class CacheManager {
  private static readonly PREFIX = 'portfolio_cache_';

  /**
   * Set a cache item with expiration
   * @param key - Cache key
   * @param data - Data to cache
   * @param ttlMs - Time to live in milliseconds (default: 24 hours)
   */
  static set<T>(key: string, data: T, ttlMs: number = 24 * 60 * 60 * 1000): void {
    if (typeof window === 'undefined') return;

    const cacheItem: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttlMs,
    };

    try {
      localStorage.setItem(
        `${this.PREFIX}${key}`,
        JSON.stringify(cacheItem)
      );
    } catch (error) {
      console.warn('Failed to set cache:', error);
      // Handle quota exceeded or other localStorage errors
      this.clearExpired();
    }
  }

  /**
   * Get a cache item if it exists and hasn't expired
   * @param key - Cache key
   * @returns Cached data or null if not found/expired
   */
  static get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(`${this.PREFIX}${key}`);
      if (!item) return null;

      const cacheItem: CacheItem<T> = JSON.parse(item);

      // Check if expired
      if (Date.now() > cacheItem.expiresAt) {
        this.delete(key);
        return null;
      }

      return cacheItem.data;
    } catch (error) {
      console.warn('Failed to get cache:', error);
      return null;
    }
  }

  /**
   * Delete a specific cache item
   * @param key - Cache key
   */
  static delete(key: string): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.removeItem(`${this.PREFIX}${key}`);
    } catch (error) {
      console.warn('Failed to delete cache:', error);
    }
  }

  /**
   * Clear all expired cache items
   */
  static clearExpired(): void {
    if (typeof window === 'undefined') return;

    try {
      const now = Date.now();
      const keys = Object.keys(localStorage);

      keys.forEach((key) => {
        if (!key.startsWith(this.PREFIX)) return;

        try {
          const item = localStorage.getItem(key);
          if (!item) return;

          const cacheItem: CacheItem<unknown> = JSON.parse(item);
          if (now > cacheItem.expiresAt) {
            localStorage.removeItem(key);
          }
        } catch {
          // Invalid cache item, remove it
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear expired cache:', error);
    }
  }

  /**
   * Clear all cache items for this app
   */
  static clearAll(): void {
    if (typeof window === 'undefined') return;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear all cache:', error);
    }
  }

  /**
   * Check if a cache item exists and is valid
   * @param key - Cache key
   * @returns true if cache exists and hasn't expired
   */
  static has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Get cache metadata (timestamp, expiration)
   * @param key - Cache key
   * @returns Cache metadata or null
   */
  static getMetadata(key: string): { timestamp: number; expiresAt: number } | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(`${this.PREFIX}${key}`);
      if (!item) return null;

      const cacheItem: CacheItem<unknown> = JSON.parse(item);
      return {
        timestamp: cacheItem.timestamp,
        expiresAt: cacheItem.expiresAt,
      };
    } catch (error) {
      return null;
    }
  }
}

// Clear expired cache on initialization
if (typeof window !== 'undefined') {
  CacheManager.clearExpired();
}
