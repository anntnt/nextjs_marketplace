import { cache } from 'react';
import { z } from 'zod';
import type { Session } from '../migrations/0010-createTableSessions';
import { sql } from './connect';
import type { Product } from './products';

export const getSearchProductsInsecure = cache(async (query: string) => {
  const searchString1 = `% ${query.toLowerCase()} %`;
  const searchString2 = `${query.toLowerCase()} %`;
  const searchString3 = `% ${query.toLowerCase()}`;
  const searchString4 = `${query.toLowerCase()}`;

  const products = await sql<Product[]>`
    SELECT
      *
    FROM
      products
    WHERE
      lower(name) LIKE ${searchString1}
      OR lower(name) LIKE ${searchString2}
      OR lower(name) LIKE ${searchString3}
      OR lower(name) LIKE ${searchString4}
      OR lower(description) LIKE ${searchString1}
      OR lower(description) LIKE ${searchString2}
      OR lower(description) LIKE ${searchString3}
      OR lower(description) LIKE ${searchString4}
  `;
  return products;
});
