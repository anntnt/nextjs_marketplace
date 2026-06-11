import { z } from 'zod';

export const newProductSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  price: z.number().int().positive('Price must be greater than zero'),
  imageUrl: z.url(),
  description: z.string().trim().min(1, 'Description is required'),
  sellerId: z.number().int().positive(),
  categoryId: z.number().int().positive('Category is required'),
  size: z.string().nullable().optional(),
  color: z.string().nullable().optional(),
  brand: z.string().nullable().optional(),
});

export const updateProductSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().trim().min(1, 'Name is required'),
  price: z.number().int().positive('Price must be greater than zero'),
  imageUrl: z.url().optional(),
  description: z.string().trim().min(1, 'Description is required'),
  categoryId: z.number().int().positive('Category is required'),
});
