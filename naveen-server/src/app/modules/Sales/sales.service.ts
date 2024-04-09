import { Sales } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

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

export const salesService = {
  createSalesService,
};
