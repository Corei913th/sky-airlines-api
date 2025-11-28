import { Table, Column, Model, DataType, ForeignKey, BelongsTo, Scopes } from 'sequelize-typescript';
import { PaymentStatusEnum } from '@/types/enum';
import Booking from './Booking';

@Scopes(() => ({
  withBooking: {
    include: [Booking]
  },
  byBooking: (bookingId: string) => ({
    where: { bookingId },
    include: [Booking]
  }),
  byStatus: (status: PaymentStatusEnum) => ({
    where: { status }
  }),
  successful: {
    where: { status: PaymentStatusEnum.SUCCESS }
  }
}))
@Table({
  tableName: 'payments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default class Payment extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false
  })
  declare amount: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatusEnum)),
    defaultValue: PaymentStatusEnum.PENDING
  })
  declare status: PaymentStatusEnum;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'payment_method'
  })
  declare paymentMethod: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'transaction_id'
  })
  declare transactionId: string;

  @Column({
    type: DataType.STRING(3),
    defaultValue: 'EUR'
  })
  declare currency: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare provider: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    defaultValue: 0,
    field: 'refund_amount'
  })
  declare refundAmount: number;

  @ForeignKey(() => Booking)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: 'booking_id'
  })
  declare bookingId: string;

  // Associations
  @BelongsTo(() => Booking)
  declare booking: Booking;

  // Méthodes d'instance
  isSuccessful(): boolean {
    return this.status === PaymentStatusEnum.SUCCESS;
  }

  canRefund(): boolean {
    return this.isSuccessful() && this.refundAmount < this.amount;
  }

  getNetAmount(): number {
    return this.amount - this.refundAmount;
  }

  // Méthodes statiques
  static async findByBookingId(bookingId: string): Promise<Payment | null> {
    return await Payment.scope({ method: ["byBooking", bookingId] }).findOne();
  }


}
