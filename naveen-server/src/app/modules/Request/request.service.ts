import { ItemRequest, RequestStatus } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

//** create items request service */
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
    requestStatus: RequestStatus.PENDING,
    storeId: storeInfo.storeId,
    userId: userInfo.userId,
  };

  const result = await prisma.itemRequest.create({
    data: itemRequestData,
  });

  return result;
};

//** change items request status service */
const changeItemsRequestStatusService = async (
  requestId: string,
  payload: RequestStatus,
) => {
  await prisma.itemRequest.findUniqueOrThrow({
    where: {
      requestId,
    },
  });

  const result = await prisma.itemRequest.update({
    where: {
      requestId,
    },
    data: {
      requestStatus: payload,
    },
  });

  return result;
};

export const requestService = {
  createRequestService,
  changeItemsRequestStatusService,
};
