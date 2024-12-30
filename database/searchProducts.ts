import { cache } from 'react';
import { z } from 'zod';
import type { Session } from '../migrations/0010-createTableSessions';
import { sql } from './connect';
import type { Product } from './products';

export const getSearchProductsInsecure = cache(async (query: string) => {
  const searchString = `%${query}%`;
  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      name LIKE ${searchString}
  `;
  return products;
});
