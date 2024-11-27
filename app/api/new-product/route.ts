import { NextRequest, NextResponse } from 'next/server';
import {
  createProduct,
  newProductSchema,
  type Product,
} from '../../../database/products';
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
  // 3. Get the token from the cookie

  try {
    const formData = await request.formData();

    const response = await cloudinaryUpload(formData, 'server-action-images');

    if (!response.imageUrl) {
      return NextResponse.json({ error: 'Image upload failed 2' });
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
      return NextResponse.json({
        error: JSON.stringify(result.error.issues),
      });
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
      }));

    if (!newProduct) {
      return NextResponse.json({ error: 'newProduct creation failed' });
    }

    return NextResponse.json({ product: newProduct });
  } catch (error) {
    console.log('error: ', error);
    return NextResponse.json({
      error: 'Image upload failed 4',
    });
  }
}
