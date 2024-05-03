import { Prisma, Store } from '@prisma/client';
import httpStatus from 'http-status';
import { paginationHelper } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import { IPaginationOptions } from '../../interfaces/pagination';
import { storeSearchableFields } from './store.constant';

//** create store service */
const createStoreService = async (payload: Store) => {
  const result = await prisma.store.create({
    data: payload,
  });

  return result;
};

//** get all store service */
const getAllStoreService = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filterData } = params;

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.StoreWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: storeSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.StoreWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.store.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      user: {
        select: {
          userCode: true,
        },
      },
    },
  });

  const total = await prisma.store.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const changeManagerService = async (storeId: string, params: any) => {
  const { newManager } = params;
  const existingStore = await prisma.store.findUnique({
    where: {
      storeId,
    },
  });

  if (!existingStore) {
    throw new ApiError(httpStatus.NOT_FOUND, "Store doesn't exist!");
  }

  const result = await prisma.store.update({
    where: {
      storeId,
    },
    data: {
      manager: newManager,
    },
  });

  return result;
};

//** delete store */
const deleteStoreService = async (storeId: string) => {
  await prisma.store.findUniqueOrThrow({
    where: {
      storeId,
    },
  });

  const result = await prisma.store.delete({
    where: {
      storeId,
    },
  });

  return result;
};

export const storeService = {
  createStoreService,
  getAllStoreService,
  changeManagerService,
  deleteStoreService,
};
