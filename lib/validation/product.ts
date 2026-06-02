import { z } from 'zod';

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