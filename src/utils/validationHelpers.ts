import { HttpError } from "@/utils/errors/httpError";

/**
 * Vérifie qu'une valeur n'est pas null/undefined
 */
export function requireNotNull<T>(
  value: T | null | undefined,
  errorMessage: string
): T {
  if (value === null || value === undefined) {
    throw HttpError.NotFound(errorMessage);
  }
  return value;
}

/**
 * Vérifie qu'une valeur est active/valide
 */
export function requireActive(
  isActive: boolean,
  errorMessage: string = "Cette ressource n'est pas active"
): void {
  if (!isActive) {
    throw HttpError.Forbidden(errorMessage);
  }
}

/**
 * Vérifie qu'un montant est positif
 */
export function requirePositiveAmount(
  amount: number,
  errorMessage: string = "Le montant doit être positif"
): void {
  if (amount <= 0) {
    throw HttpError.BadRequest(errorMessage);
  }
}

/**
 * Vérifie qu'un montant ne dépasse pas une limite
 */
export function requireAmountWithinLimit(
  amount: number,
  limit: number,
  errorMessage?: string
): void {
  if (amount > limit) {
    throw HttpError.BadRequest(
      errorMessage || `Le montant (${amount}) dépasse la limite (${limit})`
    );
  }
}

/**
 * Vérifie qu'une transition de statut est valide
 */
export function requireValidStatusTransition<T extends string>(
  currentStatus: T,
  newStatus: T,
  validTransitions: Record<T, T[]>,
  errorMessage?: string
): void {
  const allowedStatuses = validTransitions[currentStatus];
  if (!allowedStatuses || !allowedStatuses.includes(newStatus)) {
    throw HttpError.BadRequest(
      errorMessage ||
      `Transition de statut invalide: ${currentStatus} → ${newStatus}`
    );
  }
}

