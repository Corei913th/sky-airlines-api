import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { UserRoleEnum } from '@/types/enum';
import Booking from './Booking';

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export default class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  declare email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false
  })
  declare password: string;

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
    type: DataType.STRING,
    allowNull: true
  })
  declare phone: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserRoleEnum)),
    defaultValue: UserRoleEnum.CLIENT
  })
  declare role: UserRoleEnum;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  })
  declare isActive: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: 'email_verified'
  })
  declare emailVerified: boolean;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    field: 'email_verification_token'
  })
  declare emailVerificationToken: string | null;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'email_verification_expires'
  })
  declare emailVerificationExpires: Date | null;

  // Associations
  @HasMany(() => Booking)
  bookings!: Booking[];

  // Méthodes d'instance
  isAdmin(): boolean {
    return this.role === UserRoleEnum.ADMIN;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Méthodes statiques
  static async findByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email } });
  }

  static async findActiveByEmail(email: string): Promise<User | null> {
    return await User.findOne({ where: { email, isActive: true } });
  }
}