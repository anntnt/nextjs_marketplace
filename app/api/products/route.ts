import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getCategoryProductsInsecure } from '../../../database/products';

export async function GET(request: NextRequest): Promise<NextResponse<any>> {
  const url = new URL(request.url);
  const categoryId = Number(url.searchParams.get('categoryId'));
  const limit = Number(url.searchParams.get('limit')) || 21;
  const offset = Number(url.searchParams.get('offset')) || 0;

  if (!categoryId) {
    return NextResponse.json({ error: 'Missing categoryId' }, { status: 400 });
  }

  const { products, totalCount } = await getCategoryProductsInsecure(
    categoryId,
    limit,
    offset,
  );

  return NextResponse.json({ products, totalCount });
}
