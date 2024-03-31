import { Store } from '@prisma/client';
import prisma from '../../../shared/prisma';

//** create store service */
const createStoreService = async (payload: Store) => {
  const result = await prisma.store.create({
    data: payload,
  });

  return result;
};

export const storeService = {
  createStoreService,
};
