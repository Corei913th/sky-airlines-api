/**
 * Constantes de l'application
 * Respecte le principe DRY en centralisant les valeurs magiques
 */

export const APP_CONSTANTS = {
  // JWT
  JWT: {
    DEFAULT_EXPIRES_IN: "15m",
    DEFAULT_REFRESH_EXPIRES_IN: "7d",
    DEFAULT_VERIFY_EXPIRES_IN: "24h",
  },

  // Password
  PASSWORD: {
    SALT_ROUNDS: 10,
    MIN_LENGTH: 8,
  },

  // Cache
  CACHE: {
    DEFAULT_TTL: 300, // 5 minutes en secondes
    MAX_AGE: 600000, // 10 minutes en millisecondes
    PRICING_TTL: 600, // 10 minutes pour le pricing
  },

  // Retry
  RETRY: {
    DEFAULT_MAX_RETRIES: 2,
    DEFAULT_DELAY: 1000, // 1 seconde
  },

  // Validation
  VALIDATION: {
    MAX_STRING_LENGTH: 255,
    MIN_STRING_LENGTH: 1,
  },

  // Dates
  DATE: {
    EMAIL_VERIFICATION_EXPIRY_HOURS: 24,
    LAST_TICKETING_DAYS_BEFORE_FLIGHT: 2,
    LAST_TICKETING_DAYS_BEFORE_FLIGHT_CLOSE: 1,
    LAST_TICKETING_DAYS_FUTURE: 7,
  },

  // Flight
  FLIGHT: {
    MAX_BOOKABLE_SEATS: 9,
    DEFAULT_SEATS: 9,
  },
} as const;

