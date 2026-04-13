import { cache } from 'react';
import { sql } from './connect';

export type ProductCategory = {
  id: number;
  imageUrl: string;
  categoryName: string;
  parentCategoryId: number | null;
};

export type ProductCategoryName = {
  categoryName: string;
};

export const getProductCategoriesInsecure = cache(async () => {
  const productCategories = await sql<ProductCategory[]>`
    SELECT
      *
    FROM
      product_categories
    WHERE
      id IS NOT NULL
      AND image_url IS NOT NULL
      AND category_name IS NOT NULL
  `;

  return productCategories;
});

export const getProductCategoriesPaginatedInsecure = async (
  limit: number,
  offset: number,
) => {
  const productCategories = await sql<ProductCategory[]>`
    SELECT
      *
    FROM
      product_categories
    WHERE
      id IS NOT NULL
      AND image_url IS NOT NULL
      AND category_name IS NOT NULL
    ORDER BY
      category_name
    LIMIT ${limit}
    OFFSET ${offset}
  `;

  return productCategories;
};

export const getProductCategoriesTotalInsecure = async () => {
  const [result] = await sql<{ count: number }[]>`
    SELECT
      COUNT(*)::int AS count
    FROM
      product_categories
  `;

  return result?.count ?? 0;
};

export const getCategoryInsecure = cache(async (id: number) => {
  const [productCategory] = await sql<{ id: number | null; imageUrl: string | null; categoryName: string | null; parentCategoryId: number | null }[]>`
    SELECT
      *
    FROM
      product_categories
    WHERE
      id = ${id}
  `;

  return productCategory;
});
export const getCategoryNameInsecure = cache(async (id: number) => {
  const [productCategoryName] = await sql<ProductCategoryName[]>`
    SELECT
      product_categories.category_name
    FROM
      product_categories
    WHERE
      id = ${id}
      AND category_name IS NOT NULL
  `;

  return productCategoryName;
});
