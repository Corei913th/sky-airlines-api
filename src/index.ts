import "reflect-metadata";
import "./container";
import app from "./app";
import { initCache } from "@/factories/cacheFactory";
import sequelize from "@/config/database";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;


(async () => {
  // Initialisation du cache
  await initCache();

  await sequelize.authenticate();
  console.log("✅ [DATABASE] Base de données connectée avec succès.");

  /*await sequelize.sync({ force: true });
  console.log("✅ [DATABASE] Base de données synchronisée avec succès.");*/



  app.listen(PORT, () => {
    console.log(`[SERVER] 🚀 Serveur lancé sur http://localhost:${PORT}`);
    console.log(`API SKY-AIRLINES v1.0.0`);
  });

})();

