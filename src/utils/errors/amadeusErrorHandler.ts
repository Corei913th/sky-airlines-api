/**
 * Gestionnaire spécialisé pour les erreurs de l'API Amadeus
 * 
 * @class AmadeusErrorHandler
 */
export class AmadeusErrorHandler {
  /**
   * Parse et transforme les erreurs Amadeus en format standardisé
   * 
   * @method parseError
   * @param {any} error - Erreur brute d'Amadeus
   * @returns {{ code: number; detail: string }} Erreur formatée avec code et message
   */
  parseError(error: any): { code: number; detail: string } {
    // Erreurs métier Amadeus
    if (error?.response?.result?.errors?.length > 0) {
      const firstError = error.response.result.errors[0];
      return {
        code: firstError.code || error.code,
        detail: String(
          firstError.detail || firstError.title || "Unknown Amadeus error"
        ),
      };
    }

    // Erreurs réseau
    if (error.code === "ENOTFOUND") {
      return {
        code: 503,
        detail:
          "Amadeus API is unreachable. Please check your network connection.",
      };
    }

    // Erreurs d'authentification
    if (error.status === 401) {
      return {
        code: 401,
        detail:
          "Invalid Amadeus API credentials. Please check your client ID and secret.",
      };
    }

    // Erreur générique
    return {
      code: error.code || 500,
      detail: String(
        error.message || "Unknown error occurred while calling Amadeus API"
      ),
    };
  }

  /**
   * Vérifie si l'erreur est due à une limitation de quota
   * 
   * @method isRateLimitError
   * @param {any} error - Erreur à vérifier
   * @returns {boolean} true si c'est une erreur de quota
   * 
   */
  isRateLimitError(error: any): boolean {
    const parsedError = this.parseError(error);
    return parsedError.code === 429 || parsedError.detail.includes('quota');
  }

  /**
   * Vérifie si l'erreur est due à une authentification invalide
   * 
   * @method isAuthError
   * @param {any} error - Erreur à vérifier
   * @returns {boolean} true si c'est une erreur d'authentification
   */
  isAuthError(error: any): boolean {
    const parsedError = this.parseError(error);
    return parsedError.code === 401;
  }

  /**
   * Vérifie si l'erreur est temporaire (réseau, timeout)
   * 
   * @method isTemporaryError
   * @param {any} error - Erreur à vérifier
   * @returns {boolean} true si l'erreur est temporaire
   */
  isTemporaryError(error: any): boolean {
    const parsedError = this.parseError(error);
    return [502, 503, 504, 408].includes(parsedError.code) ||
      parsedError.detail.includes('timeout') ||
      parsedError.detail.includes('network');
  }
}