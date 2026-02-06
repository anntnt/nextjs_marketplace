import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { sql } from '../../../database/connect';
import type { Product } from '../../../database/products';

type ProductResponse = {
  products: Product[];
  totalCount: number;
};

export async function GET(request: NextRequest): Promise<NextResponse<ProductResponse>> {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';
  const limit = Number(url.searchParams.get('limit')) || 20;
  const offset = Number(url.searchParams.get('offset')) || 0;

  if (!query) {
    return NextResponse.json({ products: [], totalCount: 0 });
  }

  // Using ILIKE for case-insensitive search, limit & offset for pagination

  const searchPattern = `%${query}%`;

  // Fetch total count for pagination
  const totalCountResult = await sql<{ count: string }[]>`
    SELECT
      count(*) AS COUNT
    FROM
      products
    WHERE
      name ILIKE ${searchPattern}
      OR description ILIKE ${searchPattern}
  `;
  const totalCount = Number(totalCountResult[0]?.count ?? 0);

  // Fetch paginated products
  const productsRaw = await sql<
    {
      id: number;
      name: string;
      price: string;
      imageUrl: string;
      description: string;
      size: string | null;
      color: string | null;
      sellerId: number;
      categoryId: number | null;
      brand: string | null;
    }[]
  >`
    SELECT
      *
    FROM
      products
    WHERE
      name ILIKE ${searchPattern}
      OR description ILIKE ${searchPattern}
    ORDER BY
      id
    LIMIT
      ${limit}
    OFFSET
      ${offset}
  `;

  const products = productsRaw.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return NextResponse.json<ProductResponse>({ products, totalCount });
}
