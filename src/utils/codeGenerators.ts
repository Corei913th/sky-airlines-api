/**
 * Génère un code alphanumérique unique
 */
export function generateAlphanumericCode(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Génère un PNR unique (6 caractères alphanumériques)
 */
export function generatePNR(): string {
  return generateAlphanumericCode(6);
}

/**
 * Génère un numéro de ticket unique (format: 000-1234567890)
 */
export function generateTicketNumber(airlineCode: string = "000"): string {
  const randomNumber = Math.floor(Math.random() * 10000000000)
    .toString()
    .padStart(10, "0");
  return `${airlineCode}-${randomNumber}`;
}

/**
 * Génère un code unique avec vérification d'unicité
 */
export async function generateUniqueCode<T>(
  generator: () => string,
  checkUnique: (code: string) => Promise<boolean>,
  maxAttempts: number = 10
): Promise<string> {
  let code: string;
  let isUnique = false;
  let attempts = 0;

  while (!isUnique && attempts < maxAttempts) {
    code = generator();
    const exists = await checkUnique(code);
    if (!exists) {
      isUnique = true;
    }
    attempts++;
  }

  if (!isUnique) {
    throw new Error(`Impossible de générer un code unique après ${maxAttempts} tentatives`);
  }

  return code!;
}

