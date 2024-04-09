import { ItemRequest, RequestStatus } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

//** create sales service */
const createRequestService = async (user: JwtPayload, payload: ItemRequest) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      userCode: user?.userCode,
      role: user?.role,
    },
  });

  const storeInfo = await prisma.store.findUniqueOrThrow({
    where: {
      manager: userInfo.userId,
    },
  });

  const itemRequestData = {
    itemsName: payload.itemsName,
    itemsDescription: payload?.itemsDescription,
    isApproved: false,
    requestStatus: RequestStatus.PENDING,
    storeId: storeInfo.storeId,
    userId: userInfo.userId,
  };

  const result = await prisma.itemRequest.create({
    data: itemRequestData,
  });

  return result;
};

export const requestService = {
  createRequestService,
};
