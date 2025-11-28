import Amadeus from "amadeus";
import { injectable } from "tsyringe";
import z from "zod";
import { ENV } from "@/config/env";
import { HttpError } from "@/utils/errors/httpError";
import { IAmadeusClient } from "@/types/interfaces/amadeus/IAmadeusClient";
import { AmadeusErrorHandler } from "@/utils/errors/amadeusErrorHandler";
import { ILogger } from "@/types/interfaces/logger/ILogger";
import { LoggerFactory } from "@/factories/loggerFactory";


/**
 * Client Amadeus pour l'intégration avec l'API de réservation de vols Amadeus
 * Gère l'authentification, les requêtes et la gestion des erreurs
 * 
 * @class AmadeusClient
 * @implements {IAmadeusClient}
 */
@injectable()
export class AmadeusClient implements IAmadeusClient {
  private client: Amadeus;
  private errorHandler: AmadeusErrorHandler;
  private readonly logger: ILogger;

  /**
   * Crée une instance d'AmadeusClient
   * 
   * @constructor
   * @memberof AmadeusClient
   */
  constructor() {
    this.client = new Amadeus({
      clientId: ENV.AMADEUS_CLIENT_ID!,
      clientSecret: ENV.AMADEUS_CLIENT_SECRET!,
      hostname: "test",
      logLevel: "error",
    });
    this.errorHandler = new AmadeusErrorHandler();
    this.logger = LoggerFactory.create("AMADEUS");
  }




}