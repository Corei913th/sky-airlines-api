
export interface ICacheService {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  del(key: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  expire(key: string, ttl: number): Promise<void>;

  // Méthodes safe optionnelles
  safeGet?(key: string): Promise<{ success: boolean; data?: string; error?: string }>;
  safeSet?(key: string, value: string, ttl?: number): Promise<{ success: boolean; error?: string }>;
}