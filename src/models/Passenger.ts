import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { GenderEnum } from '../types/enum';
import Booking from './Booking';

@Table({
  tableName: 'passengers',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default class Passenger extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'first_name'
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'last_name'
  })
  declare lastName: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
    field: 'date_of_birth'
  })
  declare dateOfBirth: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'passport_number'
  })
  declare passportNumber: string;

  @Column({
    type: DataType.STRING(3),
    allowNull: false
  })
  declare nationality: string;

  @Column({
    type: DataType.ENUM(...Object.values(GenderEnum)),
    allowNull: true
  })
  declare gender: GenderEnum;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  })
  declare email: string;

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
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getAge(): number {
    const today = new Date();
    const birthDate = new Date(this.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}