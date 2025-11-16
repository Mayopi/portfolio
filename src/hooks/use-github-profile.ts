"use client";

import { CacheManager } from "@/lib/cache";
import { toast } from "sonner";
import useSWR from "swr";

const CACHE_KEY_PREFIX = "github_profile_";
const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function useGithubProfile(username: string) {
  const cacheKey = `${CACHE_KEY_PREFIX}${username}`;

  const { isLoading, data, error, mutate } = useSWR<GithubProfileType>(
    `https://api.github.com/users/${username}`,
    async (url: string) => {
      // First, try to get from cache
      const cachedData = CacheManager.get<GithubProfileType>(cacheKey);

      if (cachedData) {
        console.log(`Using cached GitHub profile for ${username}`);
        return cachedData;
      }

      // If no cache, fetch from GitHub
      try {
        const response = await fetch(url);

        if (!response.ok) {
          // Check rate limit
          const remaining = response.headers.get("X-RateLimit-Remaining");
          const resetTime = response.headers.get("X-RateLimit-Reset");

          if (remaining === "0" && resetTime) {
            const resetDate = new Date(parseInt(resetTime) * 1000);
            toast.error(
              `GitHub API rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}`
            );
          } else {
            toast.error("Failed to fetch GitHub profile");
          }

          throw new Error("Failed to fetch GitHub profile");
        }

        const data = await response.json();

        // Store in cache with 24-hour expiration
        CacheManager.set(cacheKey, data, ONE_DAY_MS);

        return data;
      } catch (error) {
        // If fetch fails, try one more time to get from cache (even if expired)
        // This provides a fallback in case of network issues
        const staleCache = CacheManager.get<GithubProfileType>(cacheKey);
        if (staleCache) {
          console.warn(`Using stale cache for ${username} due to fetch error`);
          return staleCache;
        }
        throw error;
      }
    },
    {
      // Revalidate after 24 hours
      dedupingInterval: ONE_DAY_MS,
      // Don't revalidate on focus by default (we want daily refresh, not on every tab switch)
      revalidateOnFocus: false,
      // Revalidate when window regains focus only if data is older than 24 hours
      revalidateIfStale: true,
      // Don't revalidate on reconnect
      revalidateOnReconnect: false,
      // Keep previous data while revalidating
      keepPreviousData: true,
      // Fallback data from cache
      fallbackData: CacheManager.get<GithubProfileType>(cacheKey) || undefined,
    }
  );

  // Function to force refresh (useful if you want to add a manual refresh button)
  const forceRefresh = async () => {
    CacheManager.delete(cacheKey);
    await mutate();
  };

  return {
    isLoading,
    profile: data,
    error,
    forceRefresh,
  };
}
