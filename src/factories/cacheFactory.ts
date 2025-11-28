import { redis } from "@/config/redis";
import { RedisCacheService } from "@/services/redisCacheService";
import { InMemoryCacheService } from "@/services/inMemoryCacheService";
import { ICacheService } from "@/types/interfaces/cache/ICacheService";

let cacheService: ICacheService;

export async function initCache(): Promise<ICacheService> {
  try {
    await redis.connect();
    console.log("✅ [CACHE] Redis connecté avec succès.");
    cacheService = new RedisCacheService();
  } catch (error) {
    console.warn(
      "⚠️ [CACHE] Redis non disponible, fallback sur mémoire locale."
    );
    // Assign an object that explicitly implements ICacheService's methods from InMemoryCacheService
    const memoryCache = new InMemoryCacheService();
    cacheService = {
      get: memoryCache.get.bind(memoryCache),
      set: memoryCache.set.bind(memoryCache),
      del: memoryCache.del.bind(memoryCache),
      exists: memoryCache.exists.bind(memoryCache),
      expire: memoryCache.expire.bind(memoryCache),
      // Add any other methods from ICacheService as needed
    };
  }

  return cacheService;
}
export function getCache(): ICacheService {
  if (!cacheService) {
    console.warn(
      "⚠️ [CACHE] Non initialisé — utilisation du cache en mémoire par défaut."
    );
    cacheService = new InMemoryCacheService();
  }
  return cacheService;
}

