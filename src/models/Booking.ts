import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany, HasOne, Scopes
} from 'sequelize-typescript';
import User from './User';
import Passenger from './Passenger';
import Payment from './Payment';
import Ticket from './Ticket';
import { BookingStatusEnum } from '@/types/enum';
import { FlightOfferSnapshot } from '@/types/flight.type';

@Scopes(() => ({
  active: {
    where: { status: [BookingStatusEnum.PENDING, BookingStatusEnum.CONFIRMED, BookingStatusEnum.CANCELLED, BookingStatusEnum.COMPLETED] }
  },
  withDetails: {
    include: [Passenger, Payment, Ticket]
  },
  withUser: {
    include: [User]
  },
  byUser: (userId: string) => ({
    where: { userId },
    include: [Passenger, Payment, Ticket]
  }),
  byPNR: (pnr: string) => ({
    where: { pnr }
  }),
  byStatus: (status: BookingStatusEnum) => ({
    where: { status }
  })
}))
@Table({
  tableName: 'bookings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default class Booking extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    unique: true,
    field: 'reference_pnr'
  })
  declare pnr: string;

  @Column({
    type: DataType.ENUM(...Object.values(BookingStatusEnum)),
    defaultValue: BookingStatusEnum.PENDING
  })
  declare status: BookingStatusEnum;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    field: 'total_amount'
  })
  declare totalAmount: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'amadeus_order_id'
  })
  declare amadeusOrderId: string;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
    field: 'offer_snapshot'
  })
  declare offerSnapshot: FlightOfferSnapshot;

  @Column({
    type: DataType.STRING(3),
    defaultValue: 'EUR'
  })
  declare currency: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'user_id'
  })
  declare userId: string;

  // Associations
  @BelongsTo(() => User)
  declare user: User;

  @HasMany(() => Passenger)
  declare passengers: Passenger[];

  @HasOne(() => Payment)
  declare payment: Payment;

  @HasMany(() => Ticket)
  declare tickets: Ticket[];

  // Méthode pour récupérer tous les tickets de la réservation
  async getAllTickets(): Promise<Ticket[]> {
    return await Ticket.findAll({
      where: { bookingId: this.id },
      include: [Passenger]
    });
  }

  // Vérifier si tous les tickets sont émis
  async areAllTicketsIssued(): Promise<boolean> {
    const tickets = await this.getAllTickets();
    return tickets.length > 0 && tickets.every(ticket => ticket.isIssued());
  }

  // Méthodes d'instance
  getFlightDetails() {
    const offer = this.offerSnapshot.data;
    const firstSegment = offer.itineraries[0].segments[0];
    const lastSegment = offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1];

    return {
      flightNumber: firstSegment.number,
      airline: offer.validatingAirlineCodes[0],
      departure: firstSegment.departure.iataCode,
      arrival: lastSegment.arrival.iataCode,
      departureTime: firstSegment.departure.at,
      arrivalTime: lastSegment.arrival.at
    };
  }

  canCancel(): boolean {
    return this.status === BookingStatusEnum.PENDING ||
      this.status === BookingStatusEnum.CONFIRMED ||
      this.status === BookingStatusEnum.CANCELLED;
  }

  getPassengerCount(): number {
    return this.passengers ? this.passengers.length : 0;
  }

  // Méthodes statiques
  static async findByPNR(pnr: string): Promise<Booking | null> {
    return await Booking.scope({ method: ["byPNR", pnr] }).findOne();
  }

  static async findByPNROrThrow(pnr: string): Promise<Booking> {
    const booking = await Booking.findByPNR(pnr);
    if (!booking) {
      throw new Error("Réservation non trouvée");
    }
    return booking;
  }
}