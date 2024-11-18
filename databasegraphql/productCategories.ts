import { cache } from 'react';
import { sql } from './connect';

export type ProductCategory = {
  id: number;
  categoryName: string;
  imageUrl: string;
  parentCategoryId: number;
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
  `;

  return productCategories;
});

export const getCategoryInsecure = cache(async (id: number) => {
  const [productCategory] = await sql<ProductCategory[]>`
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
  `;

  return productCategoryName;
});
