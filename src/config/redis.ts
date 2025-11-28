import { createClient } from "redis";
import { ENV } from "./env";

export const redis = createClient({
  socket: {
    host: ENV.REDIS_HOST,
    port: Number(ENV.REDIS_PORT),
  },
});

redis.on("connect", () => console.log("🔌 Redis CONNECT event OK"));
redis.on("ready", () => console.log("🚀 Redis READY"));
redis.on("error", (err) => console.error("Redis Client Error", err));
