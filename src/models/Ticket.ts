import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Scopes } from 'sequelize-typescript';
import Booking from './Booking';
import Passenger from './Passenger';
import {TicketStatusEnum, DocumentTypeEnum } from '@/types/enum';

@Scopes(() => ({
  withDetails: {
    include: [Booking, Passenger]
  },
  byBooking: (bookingId: string) => ({
    where: { bookingId },
    include: [Passenger]
  }),
  byPassenger: (passengerId: string) => ({
    where: { passengerId }
  }),
  byStatus: (status: TicketStatusEnum) => ({
    where: { status }
  }),
  issued: {
    where: { status: TicketStatusEnum.ISSUED }
  }
}))
@Table({
  tableName: 'tickets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default class Ticket extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING(13),
    allowNull: false,
    unique: true,
    field: 'ticket_number'
  })
  ticketNumber!: string; // Format: 000-1234567890

  @Column({
    type: DataType.ENUM(...Object.values(DocumentTypeEnum)),
    allowNull: false,
    field: 'document_type'
  })
  documentType!: DocumentTypeEnum;

  @Column({
    type: DataType.ENUM(...Object.values(TicketStatusEnum)),
    defaultValue: TicketStatusEnum.ISSUED
  })
  status!: TicketStatusEnum;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'issuing_airline'
  })
  issuingAirline!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'issue_date'
  })
  issueDate!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    field: 'fare_amount'
  })
  fareAmount!: number;

  @Column({
    type: DataType.STRING(3),
    defaultValue: 'EUR'
  })
  currency!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'pdf_url'
  })
  pdfUrl?: string; // URL vers le PDF stocké (S3 ou autre)

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'qr_code_url'
  })
  qrCodeUrl?: string; // URL vers le QR code

  @Column({
    type: DataType.JSONB,
    allowNull: true,
    field: 'barcode_data'
  })
  barcodeData?: any; // Données brutes du code-barres

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'amadeus_ticket_id'
  })
  amadeusTicketId?: string; // Référence Amadeus si applicable

  @ForeignKey(() => Booking)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'booking_id'
  })
  bookingId!: string;

  @ForeignKey(() => Passenger)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'passenger_id'
  })
  passengerId!: string;

  // Associations
  @BelongsTo(() => Booking)
  booking!: Booking;

  @BelongsTo(() => Passenger)
  passenger!: Passenger;

  // Méthodes d'instance
  isIssued(): boolean {
    return this.status === TicketStatusEnum.ISSUED;
  }

  canVoid(): boolean {
    return this.status === TicketStatusEnum.ISSUED;
  }

  canRefund(): boolean {
    return this.status === TicketStatusEnum.ISSUED;
  }

  getFormattedTicketNumber(): string {
    // Format: 000-1234567890 → 000 123 456 7890
    return this.ticketNumber.replace('-', ' ').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 ');
  }

  getDownloadUrls() {
    return {
      pdf: this.pdfUrl,
      qrCode: this.qrCodeUrl,
      boardingPass: this.documentType === DocumentTypeEnum.BOARDING_PASS ? this.pdfUrl : null as any
    };
  }

  // Méthodes statiques
  static async findByTicketNumber(ticketNumber: string): Promise<Ticket | null> {
    return await Ticket.findOne({ where: { ticketNumber } });
  }

  static async findByBookingId(bookingId: string): Promise<Ticket[]> {
    return await Ticket.scope({ method: ["byBooking", bookingId] }).findAll();
  }
}

/*function Scopes(arg0: () => { withDetails: { include: (typeof Passenger | typeof Booking)[]; }; byBooking: (bookingId: string) => { where: { bookingId: string; }; include: (typeof Passenger)[]; }; byPassenger: (passengerId: string) => { where: { passengerId: string; }; }; byStatus: (status: TicketStatusEnum) => { where: { status: TicketStatusEnum; }; }; issued: { where: { status: TicketStatusEnum; }; }; }): (target: typeof Ticket) => void | typeof Ticket {
  throw new Error('Function not implemented.');
}*/
