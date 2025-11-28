export enum UserRoleEnum {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN'
}

export enum BookingStatusEnum {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export enum PaymentStatusEnum {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum TravelClassEnum {
  ECONOMY = 'ECONOMY',
  PREMIUM_ECONOMY = 'PREMIUM_ECONOMY',
  BUSINESS = 'BUSINESS',
  FIRST = 'FIRST'
}

export enum TicketStatusEnum {
  ISSUED = 'ISSUED',
  VOIDED = 'VOIDED',
  USED = 'USED',
  REFUNDED = 'REFUNDED'
}

export enum DocumentTypeEnum {
  E_TICKET = 'E_TICKET',
  BOARDING_PASS = 'BOARDING_PASS',
  INVOICE = 'INVOICE',
  RECEIPT = 'RECEIPT'
}

export enum PriceVarianceDirectionEnum {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  STABLE = 'STABLE'
}

export enum LogLevelEnum {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}