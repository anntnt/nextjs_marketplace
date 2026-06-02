import { NextRequest, NextResponse } from 'next/server';
import {
  createProduct,
  type Product,
} from '../../../database/products';
import { newProductSchema } from '../../../lib/validation/product';
import { formatZodIssues } from '../../../lib/validation/formatErrors';
import { cloudinaryUpload } from '../../../util/cloudinaryUpload';
import { getCookie } from '../../../util/cookies';

export type ProductCreatePost =
  | {
      product: Omit<Product, 'id'>;
    }
  | {
      error: string;
    };

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ProductCreatePost>> {
  try {
    const formData = await request.formData();

    const response = await cloudinaryUpload(formData, 'server-action-images');

    if (!response.imageUrl) {
      return NextResponse.json(
        {
          error: `${response.error}`,
        },
        { status: 400 },
      );
    }

    const body = {
      name: formData.get('name'),
      price: Number(formData.get('price')),
      imageUrl: response.imageUrl,
      description: formData.get('description'),
      sellerId: Number(formData.get('sellerId')),
      categoryId: Number(formData.get('categoryId')),
    };

    const result = newProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: formatZodIssues(result.error),
        },
        { status: 400 },
      );
    }
    const sessionTokenCookie = await getCookie('sessionToken');
    const newProduct =
      sessionTokenCookie &&
      (await createProduct(sessionTokenCookie, {
        name: result.data.name,
        price: result.data.price,
        imageUrl: result.data.imageUrl,
        description: result.data.description,
        sellerId: result.data.sellerId,
        categoryId: result.data.categoryId,
        size: null,
        color: null,
        brand: null,
      }));

    if (!newProduct) {
      return NextResponse.json(
        { error: 'Product creation failed. Please check your seller session.' },
        { status: 400 },
      );
    }

    return NextResponse.json({ product: newProduct });
  } catch {
    return NextResponse.json(
      {
        error: 'Image upload failed',
      },
      { status: 500 },
    );
  }
}
