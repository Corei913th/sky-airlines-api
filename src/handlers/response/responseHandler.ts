import { Response } from "express";
import { createSuccessResponse, createErrorResponse } from "@/utils/response";

/**
 * Gestionnaire spécialisé pour les réponses HTTP 
 * 
 * @class ResponseHandler
 */
export class ResponseHandler {
  /**
   * Envoie une réponse de succès avec les données formatées
   * 
   * @method sendSuccessResponse
   * @param {Response} res - Objet réponse Express
   * @param {any} data - Données à envoyer
   * @param {Object} meta - Métadonnées supplémentaires
   * @param {boolean} [meta.cached] - Indique si les données proviennent du cache
   * @param {number} [meta.executionTime] - Temps d'exécution en ms
   * @param {number} [meta.count] - Nombre d'éléments
   * @returns {Response} Réponse Express formatée
   */
  sendSuccessResponse(
    res: Response,
    data: any,
    meta: { cached?: boolean; executionTime?: number; count?: number;[key: string]: any } = {}
  ): Response {
    return res.json(
      createSuccessResponse(data, {
        timestamp: new Date().toISOString(),
        ...meta
      })
    );
  }

  /**
   * Envoie une erreur de validation
   * 
   * @method sendValidationError
   * @param {Response} res - Objet réponse Express
   * @param {string[]} errors - Liste des erreurs de validation
   * @param {number} executionTime - Temps d'exécution en ms
   * @returns {Response} Réponse d'erreur 400
   */
  sendValidationError(res: Response, errors: string[], executionTime?: number): Response {
    return res.status(400).json(
      createErrorResponse('Données de requête invalides', {
        errorType: 'VALIDATION_ERROR',
        details: errors,
        ...(executionTime && { executionTime }),
        timestamp: new Date().toISOString()
      })
    );
  }

  /**
   * Envoie une erreur de service (Amadeus, cache, etc.)
   * 
   * @method sendServiceError
   * @param {Response} res - Objet réponse Express
   * @param {string} error - Message d'erreur
   * @param {number} executionTime - Temps d'exécution en ms
   * @returns {Response} Réponse d'erreur 400
   */
  sendServiceError(res: Response, error: string, executionTime?: number): Response {
    return res.status(400).json(
      createErrorResponse(error, {
        errorType: 'SERVICE_ERROR',
        ...(executionTime && { executionTime }),
        timestamp: new Date().toISOString()
      })
    );
  }

  /**
   * Envoie une erreur "non trouvé"
   * 
   * @method sendNotFoundError
   * @param {Response} res - Objet réponse Express
   * @param {string} message - Message d'erreur
   * @param {number} executionTime - Temps d'exécution en ms
   * @returns {Response} Réponse d'erreur 404
   */
  sendNotFoundError(res: Response, message: string, executionTime?: number): Response {
    return res.status(404).json(
      createErrorResponse(message, {
        errorType: 'NOT_FOUND',
        ...(executionTime && { executionTime }),
        timestamp: new Date().toISOString()
      })
    );
  }

  /**
   * Envoie une erreur interne du serveur
   * 
   * @method sendInternalError
   * @param {Response} res - Objet réponse Express
   * @param {string} message - Message d'erreur
   * @returns {Response} Réponse d'erreur 500
   */
  sendInternalError(res: Response, message: string = 'Erreur interne du serveur'): Response {
    return res.status(500).json(
      createErrorResponse(message, {
        errorType: 'INTERNAL_ERROR',
        timestamp: new Date().toISOString()
      })
    );
  }
}