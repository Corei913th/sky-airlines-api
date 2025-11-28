import { Sequelize } from 'sequelize-typescript';
import { User, Booking, Passenger, Payment, Ticket } from "@/models"
import { ENV } from "./env"; 

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASS ?? undefined, {
  dialect: 'postgres',
  models: [User, Booking, Passenger, Payment, Ticket],
  logging: ENV.NODE_ENV === 'development'
});

export default sequelize;