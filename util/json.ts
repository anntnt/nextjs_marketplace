import sjson from 'secure-json-parse';
import type { ProductQuantityInCart } from './cart';

export function parseJson(json: string | undefined) {
  if (!json) return undefined;
  try {
    return sjson(json) as ProductQuantityInCart[];
  } catch {
    return undefined;
  }
}
