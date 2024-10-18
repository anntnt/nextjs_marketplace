import sjson from 'secure-json-parse';
import type { Cart } from '../app/products/[productId]/_action.ts.old';

export function parseJson(json: string | undefined) {
  if (!json) return undefined;
  try {
    return sjson(json) as Cart[];
  } catch {
    return undefined;
  }
}
