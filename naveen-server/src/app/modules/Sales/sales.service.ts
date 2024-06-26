import { Prisma, Sales } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { paginationHelper } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../interfaces/pagination';
import { salesSearchableFields } from './sales.constant';

//** create sales service */
const createSalesService = async (user: JwtPayload, payload: Sales) => {
  const result = await prisma.$transaction(async (transactioClient) => {
    const userInfo = await transactioClient.user.findUniqueOrThrow({
      where: {
        userCode: user?.userCode,
        role: user?.role,
      },
    });

    const storeInfo = await transactioClient.store.findUniqueOrThrow({
      where: {
        manager: userInfo.userId,
      },
    });

    const salesData = {
      amount: payload.amount,
      date: new Date(payload.date),
      userId: storeInfo.manager,
      storeId: storeInfo.storeId,
    };

    const createdSales = await transactioClient.sales.create({
      data: salesData,
    });

    return createdSales;
  });

  return result;
};

//** get all sales service */
const getAllSalesService = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, timeFrame, ...filterData } = params;

  const today = new Date();

  let startTime;
  let endTime;

  if (timeFrame === 'daily') {
    startTime = new Date(today.setHours(0, 0, 0, 0));
    endTime = new Date(today);
    endTime.setDate(endTime.getDate() + 1);
  } else if (timeFrame === 'weekly') {
    startTime = new Date(today.setDate(today.getDate() - today.getDay()));
    endTime = new Date(today.setDate(today.getDate() + 7));
  } else if (timeFrame === 'monthly') {
    startTime = new Date(today.getFullYear(), today.getMonth(), 1);
    endTime = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  } else if (timeFrame === 'yearly') {
    startTime = new Date(today.getFullYear(), 0, 1);
    endTime = new Date(today.getFullYear() + 1, 0, 0);
  }

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.SalesWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: salesSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (timeFrame) {
    andConditions.push({
      date: {
        gte: startTime,
        lte: endTime,
      },
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

  const whereConditions: Prisma.SalesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.sales.findMany({
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
      user: true,
      store: true,
    },
  });

  const total = await prisma.sales.count({
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

//** get sales by store ID service */
const getSalesByStoreId = async (storeId: string) => {
  const salesInfo = await prisma.sales.findMany({
    where: {
      storeId,
    },
    include: {
      user: true,
      store: true,
    },
  });

  return salesInfo;
};

//** get all sales service */
const getMySalesService = async (
  userCode: string,
  params: any,
  options: IPaginationOptions,
) => {
  const { searchTerm, ...filterData } = params;

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.SalesWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: salesSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  andConditions.push({
    user: {
      userCode: userCode,
    },
  });

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.SalesWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.sales.findMany({
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
      user: true,
      store: true,
    },
  });

  const total = await prisma.sales.count({
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

export const salesService = {
  createSalesService,
  getAllSalesService,
  getSalesByStoreId,
  getMySalesService,
};
