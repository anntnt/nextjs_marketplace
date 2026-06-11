import { NextRequest, NextResponse } from 'next/server';
import {
  type Product,
  updateProduct,
} from '../../../database/products';
import { updateProductSchema } from '../../../lib/validation/product';
import { formatZodIssues } from '../../../lib/validation/formatErrors';
import { cloudinaryUpload } from '../../../lib/image/cloudinary';
import { getCookie } from '../../../lib/cookies';

export type ProductEditPut =
  | {
      product: Omit<Product, 'sellerId'>;
    }
  | {
      error: string;
    };

export async function PUT(
  request: NextRequest,
): Promise<NextResponse<ProductEditPut>> {
  try {
    const formData = await request.formData();

    const file = formData.get('image') as File;

    let imageUrl;
    if (file.name) {
      const response = await cloudinaryUpload(formData, 'server-action-images');

      if (!response.imageUrl) {
        return NextResponse.json({ error: 'Image upload failed' });
      }
      imageUrl = response.imageUrl;
    }

    const body = {
      id: Number(formData.get('productId')),
      name: formData.get('name'),
      price: Number(formData.get('price')),
      imageUrl: imageUrl,
      description: formData.get('description'),
      categoryId: Number(formData.get('categoryId')),
    };
    const result = updateProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({
        error: formatZodIssues(result.error),
      });
    }
    const sessionTokenCookie = await getCookie('sessionToken');

    const updatedProduct =
      sessionTokenCookie &&
      (await updateProduct(sessionTokenCookie, {
        id: result.data.id,
        name: result.data.name,
        price: result.data.price,
        imageUrl: result.data.imageUrl ?? null,
        description: result.data.description,
        categoryId: result.data.categoryId,
        brand: null,
        size: null,
        color: null,
      }));

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product update failed' });
    }

    return NextResponse.json({ product: updatedProduct });
  } catch {
    return NextResponse.json({
      error: 'Product update failed',
    });
  }
}
