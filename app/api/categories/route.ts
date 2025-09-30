import { NextRequest, NextResponse } from 'next/server';
import {
  getProductCategoriesPaginatedInsecure,
  getProductCategoriesTotalInsecure,
} from '../../../database/productCategories';

const DEFAULT_LIMIT = 12;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const offsetParam = searchParams.get('offset');

  const limit = limitParam ? Number(limitParam) : DEFAULT_LIMIT;
  const offset = offsetParam ? Number(offsetParam) : 0;

  if (!Number.isFinite(limit) || !Number.isFinite(offset) || limit <= 0) {
    return NextResponse.json(
      { error: 'Invalid limit or offset' },
      { status: 400 },
    );
  }

  const [categories, total] = await Promise.all([
    getProductCategoriesPaginatedInsecure(limit, offset),
    getProductCategoriesTotalInsecure(),
  ]);

  return NextResponse.json({ categories, total });
}
