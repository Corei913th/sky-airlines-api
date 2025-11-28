import { ICacheService } from "@/types/interfaces/cache/ICacheService";

export class InMemoryCacheService implements ICacheService {
  private cache = new Map<string, any>();

  async get<T>(key: string): Promise<T | null> {
    return this.cache.get(key) ?? null;
  }

  async set(key: string, value: any, ttlSeconds: number): Promise<void> {
    this.cache.set(key, value);
    setTimeout(() => this.cache.delete(key), ttlSeconds * 1000);
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }


  async exists(key: string): Promise<boolean> {
    try {
      return this.cache.has(key);
    } catch (error) {
      console.warn(`[CACHE] Erreur exists(${key}):`, error);
      return false;
    }
  }


  async expire(key: string, ttl: number): Promise<void> {
    try {
      if (this.cache.has(key)) {
        setTimeout(() => this.cache.delete(key), ttl * 1000);
      }
    } catch (error) {
      console.warn(`[CACHE] Erreur expire(${key}):`, error);
    }
  }

}
