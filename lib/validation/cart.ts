import { z } from 'zod';

export const cartProductSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});