import "reflect-metadata";
import { container } from "tsyringe";
import Amadeus from "amadeus";

// Interfaces
import { ICacheService } from "@/types/interfaces/cache/ICacheService";
import { IAmadeusClient } from "@/types/interfaces/amadeus/IAmadeusClient";



// Services métier


// New UseCase architecture


// Services de support

import { RedisCacheService } from "@/services/redisCacheService";
import { AmadeusClient } from "@/services/clients/amadeusClient";



// Configuration
import { ENV } from "./config/env";


// ============================================
// Enregistrement des services dans le container
// ============================================

// Interfaces (services abstraits)
container.registerSingleton<ICacheService>("ICacheService", RedisCacheService);
container.registerSingleton<IAmadeusClient>("IAmadeusClient", AmadeusClient);



// Services métier


// Services d'orders spécialisés (SOLID)


// New UseCase architecture (interfaces)



container.registerSingleton(RedisCacheService);



// Enregistrement de la dépendance Amadeus
container.register("amadeus", {
  useFactory: () =>
    new Amadeus({
      clientId: ENV.AMADEUS_CLIENT_ID || "",
      clientSecret: ENV.AMADEUS_CLIENT_SECRET || "",
    }),
});
