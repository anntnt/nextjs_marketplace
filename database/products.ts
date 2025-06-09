import { cache } from 'react';
import { z } from 'zod';
import type { Session } from '../migrations/0010-createTableSessions';
import { sql } from './connect';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  size: string | null;
  color: string | null;
  sellerId: number;
  categoryId: number | null;
  brand: string | null;
};

export type ProductWithSeller = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  size: string | null;
  color: string | null;
  sellerId: number;
  storeName: string | null;
  categoryId: number | null;
  brand: string | null;
};

export const newProductSchema = z.object({
  name: z.string(),
  price: z.number(),
  imageUrl: z.string(),
  description: z.string(),
  sellerId: z.number(),
  categoryId: z.number(),
  size: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
});

export const updateProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  imageUrl: z.string().optional(),
  description: z.string(),
  categoryId: z.number(),
});
export const createProduct = cache(
  async (sessionToken: Session['token'], newProduct: Omit<Product, 'id'>) => {
    const [productRaw] = await sql<
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
      INSERT INTO
        products (
          name,
          price,
          image_url,
          description,
          seller_id,
          category_id,
          size,
          color,
          brand
        )
      SELECT
        ${newProduct.name},
        ${newProduct.price},
        ${newProduct.imageUrl},
        ${newProduct.description},
        ${newProduct.sellerId},
        ${newProduct.categoryId},
        ${newProduct.size},
        ${newProduct.color},
        ${newProduct.brand}
      FROM
        sessions
      WHERE
        token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
      RETURNING
        products.*
    `;

    if (!productRaw) return undefined;

    const product: Product = {
      ...productRaw,
      price: Number(productRaw.price),
    };

    return product;
  },
);
export const getProductsInsecure = cache(async () => {
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
    ORDER BY
      id;
  `;

  const products: Product[] = productsRaw.map((productRaw) => ({
    ...productRaw,
    price: Number(productRaw.price),
  }));

  return products;
});

export const getProductInsecure = cache(async (id: number) => {
  const [productRaw] = await sql<
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
      id = ${id}
  `;

  if (!productRaw) return undefined;

  const product: Product = {
    ...productRaw,
    price: Number(productRaw.price), // 🔥 convert string to number
  };

  return product;
});

export const getCategoryProductsInsecure = cache(
  async (
    categoryId: number,
    limit = 20, // default limit
    offset = 0, // default offset
  ): Promise<Product[]> => {
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
        category_id = ${categoryId}
      ORDER BY
        id
      LIMIT
        ${limit}
      OFFSET
        ${offset};
    `;

    const products: Product[] = productsRaw.map((productRaw) => ({
      ...productRaw,
      price: Number(productRaw.price),
    }));

    return products;
  },
);

export const getCategoryProductWithSellerInsecure = cache(
  async (productId: number) => {
    const [productRaw] = await sql<
      (Omit<ProductWithSeller, 'price'> & { price: string })[]
    >`
      SELECT
        products.*,
        users.store_name
      FROM
        products
        INNER JOIN users ON products.seller_id = users.id
      WHERE
        products.id = ${productId}
    `;

    if (!productRaw) return undefined;

    const product: ProductWithSeller = {
      ...productRaw,
      price: Number(productRaw.price),
    };

    return product;
  },
);

export const getProductsOfSeller = cache(
  async (sessionToken: Session['token']) => {
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
        products.*
      FROM
        products
        INNER JOIN sessions ON products.seller_id = sessions.user_id
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
      ORDER BY
        id;
    `;

    const products: Product[] = productsRaw.map((productRaw) => ({
      ...productRaw,
      price: Number(productRaw.price),
    }));

    return products;
  },
);
export const removeProduct = cache(
  async (sessionToken: Session['token'], id: number) => {
    const [productRaw] = await sql<
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
      DELETE FROM products USING sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND products.id = ${id}
        AND products.seller_id = sessions.user_id
      RETURNING
        products.*
    `;

    if (!productRaw) return undefined;
    const product: Product = {
      ...productRaw,
      price: Number(productRaw.price),
    };
    return product;
  },
);

export const updateProduct = cache(
  async (
    sessionToken: Session['token'],
    updatedProduct: Omit<Product, 'sellerId'>,
  ) => {
    const [productRaw] = await sql<
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
      UPDATE products
      SET
        name = ${updatedProduct.name},
        price = ${updatedProduct.price},
        image_url = ${updatedProduct.imageUrl},
        description = ${updatedProduct.description},
        size = NULL,
        color = NULL,
        category_id = ${updatedProduct.categoryId}
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND products.id = ${updatedProduct.id}
      RETURNING
        products.*
    `;
    if (!productRaw) return undefined;
    const product: Product = {
      ...productRaw,
      price: Number(productRaw.price),
    };
    return product;
  },
);

export const updateProductWithoutImage = cache(
  async (
    sessionToken: Session['token'],
    updatedProduct: Omit<Product, 'sellerId' | 'imageUrl'>,
  ) => {
    const [productRaw] = await sql<
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
      UPDATE products
      SET
        name = ${updatedProduct.name},
        price = ${updatedProduct.price},
        description = ${updatedProduct.description},
        size = NULL,
        color = NULL,
        category_id = ${updatedProduct.categoryId}
      FROM
        sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND products.id = ${updatedProduct.id}
      RETURNING
        products.*
    `;
    if (!productRaw) return undefined;
    const product: Product = {
      ...productRaw,
      price: Number(productRaw.price),
    };
    return product;
  },
);
