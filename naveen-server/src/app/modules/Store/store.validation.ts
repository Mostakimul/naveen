import { StoreType } from '@prisma/client';
import { z } from 'zod';
const createStore = z.object({
  body: z.object({
    storeName: z.string({
      required_error: 'Store name is required!',
    }),
    storeLocation: z.string({
      required_error: 'Store location is required!',
    }),
    storeType: z.enum([
      StoreType.DAZZLE,
      StoreType.DAZZLE_OUTLET,
      StoreType.DAZZLE_PREMIUM,
      StoreType.RESTAURANT,
      StoreType.WAREHOUSE,
    ]),
    manager: z.string({
      required_error: 'Manager is required!',
    }),
  }),
});
export const storeValidation = {
  createStore,
};
