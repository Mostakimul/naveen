import { z } from 'zod';

const createRequestSchema = z.object({
  itemsName: z.array(z.string()),
  itemsDescription: z.string().optional(),
  itemsCost: z.number().optional(),
  invoiceImage: z.string().optional(),
  remarks: z.string().optional(),
});

export const requestValidation = {
  createRequestSchema,
};
