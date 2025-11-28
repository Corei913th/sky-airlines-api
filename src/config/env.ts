import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  AMADEUS_CLIENT_ID: process.env.AMADEUS_CLIENT_ID!,
  AMADEUS_CLIENT_SECRET: process.env.AMADEUS_CLIENT_SECRET!,
  AMADEUS_HOSTNAME: process.env.AMADEUS_HOSTNAME!,
  DB_NAME: process.env.DB_NAME!,
  DB_USER: process.env.DB_USER!,
  DB_PASS: process.env.DB_PASS!,
  DB_HOST: process.env.DB_HOST!,
  DB_PORT: process.env.DB_PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  PORT: process.env.PORT!,
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN!,
  JWT_RESET_SECRET: process.env.JWT_RESET_SECRET!,
  JWT_RESET_EXPIRES_IN: process.env.JWT_RESET_EXPIRES_IN!,
  JWT_VERIFY_SECRET: process.env.JWT_VERIFY_SECRET!,
  JWT_VERIFY_EXPIRES_IN: process.env.JWT_VERIFY_EXPIRES_IN!,
  // SMTP Configuration
  SMTP_HOST: process.env.SMTP_HOST!,
  SMTP_PORT: process.env.SMTP_PORT!,
  SMTP_SECURE: process.env.SMTP_SECURE!,
  SMTP_USER: process.env.SMTP_USER!,
  SMTP_PASS: process.env.SMTP_PASS!,
  SMTP_FROM_EMAIL: process.env.SMTP_FROM_EMAIL!,
  SMTP_FROM_NAME: process.env.SMTP_FROM_NAME!,
  FRONTEND_URL: process.env.FRONTEND_URL!,

  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_API_KEY: process.env.REDIS_API_KEY,
  REDIS_ENABLED: process.env.REDIS_ENABLED,
  CACHE_TTL_SECONDS: process.env.CACHE_TTL_SECONDS,
};
