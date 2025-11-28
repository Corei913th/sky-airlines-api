import { Model } from "sequelize-typescript";
import { HttpError } from "@/utils/errors/httpError";

// Types pour les options de requête
type FindOptions = any;
type Includeable = any;

/**
 * Helper pour trouver une entité par ID avec gestion d'erreur
 */
export async function findByIdOrThrow<T extends Model>(
  model: typeof Model & { new(): T },
  id: string,
  options?: FindOptions,
  errorMessage?: string
): Promise<T> {
  const entity = await (model.findByPk(id, options) as Promise<T | null>);
  if (!entity) {
    throw HttpError.NotFound(errorMessage || `${model.name} non trouvé`);
  }
  return entity;
}

/**
 * Helper pour trouver une entité ou retourner null
 */
export async function findByIdOrNull<T extends Model>(
  model: typeof Model & { new(): T },
  id: string,
  options?: FindOptions
): Promise<T | null> {
  return (await model.findByPk(id, options)) as T | null;
}

/**
 * Helper pour vérifier l'existence d'une entité
 */
export async function exists<T extends Model>(
  model: typeof Model & { new(): T },
  where: any
): Promise<boolean> {
  const count = await model.count({ where });
  return count > 0;
}

/**
 * Helper pour exclure le champ password des résultats
 */
export function excludePassword(): { attributes: { exclude: string[] } } {
  return {
    attributes: { exclude: ["password"] },
  };
}

/**
 * Helper pour inclure des associations communes
 */
export function includeAssociations(associations: Includeable[]) {
  return {
    include: associations,
  };
}

/**
 * Helper pour les options de requête avec pagination
 */
export interface PaginationOptions {
  page?: number;
  limit?: number;
  order?: [string, "ASC" | "DESC"][];
}

export function paginate(options: PaginationOptions = {}) {
  const { page = 1, limit = 10, order = [["created_at", "DESC"]] } = options;
  const offset = (page - 1) * limit;

  return {
    limit,
    offset,
    order,
  };
}

/**
 * Helper pour les options de requête avec tri
 */
export function orderBy(
  field: string,
  direction: "ASC" | "DESC" = "DESC"
): { order: [string, "ASC" | "DESC"][] } {
  return {
    order: [[field, direction]],
  };
}
