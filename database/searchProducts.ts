import { cache } from 'react';
import { z } from 'zod';
import type { Session } from '../migrations/0010-createTableSessions';
import { sql } from './connect';
import type { Product } from './products';

export const getSearchProductsInsecure = cache(async (query: string) => {
  const searchString1 = `% ${query} %`;
  const searchString2 = `${query} %`;
  const searchString3 = `% ${query}`;
  const searchString4 = `${query}`;

  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      name ILIKE ${searchString1}
      OR name ILIKE ${searchString2}
      OR name ILIKE ${searchString3}
      OR name ILIKE ${searchString4}
      OR description ILIKE ${searchString1}
      OR description ILIKE ${searchString2}
      OR description ILIKE ${searchString3}
      OR description ILIKE ${searchString4}
  `;
  return products;
});
