import { redis } from "@/config/redis";
import { ICacheService } from "@/types/interfaces/cache/ICacheService";

export class RedisCacheService implements ICacheService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await redis.get(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      console.warn(`[CACHE] Erreur get(${key}):`, error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds: number): Promise<void> {
    try {
      const json = JSON.stringify(value);
      await redis.setEx(key, ttlSeconds, json);
    } catch (error) {
      console.warn(`[CACHE] Erreur set(${key}):`, error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await redis.del(key);
    } catch (error) {
      console.warn(`[CACHE] Erreur del(${key}):`, error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      const result = await redis.exists(key);
      return result > 0;
    } catch (error) {
      console.warn(`[CACHE] Erreur exists(${key}):`, error);
      return false;
    }
  }

  async expire(key: string, ttl: number): Promise<void> {
    try {
      await redis.expire(key, ttl);
    } catch (error) {
      console.warn(`[CACHE] Erreur expire(${key}):`, error);
    }
  }
}
