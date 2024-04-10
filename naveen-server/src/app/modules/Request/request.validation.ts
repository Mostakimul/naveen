import { RequestStatus } from '@prisma/client';
import { z } from 'zod';

const createRequestSchema = z.object({
  itemsName: z.array(z.string()),
  itemsDescription: z.string().optional(),
  itemsCost: z.number().optional(),
  invoiceImage: z.string().optional(),
  remarks: z.string().optional(),
});

const updateRequestStatusSchema = z.object({
  requestStatus: z.enum([
    RequestStatus.APPROVED,
    RequestStatus.IN_TRANSIT,
    RequestStatus.PENDING,
    RequestStatus.RECEIEVED,
    RequestStatus.REJECTED,
  ]),
});

export const requestValidation = {
  createRequestSchema,
  updateRequestStatusSchema,
};
