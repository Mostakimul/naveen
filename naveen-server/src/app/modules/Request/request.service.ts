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

//** change items request status service */
const getAllRequestedItemsService = async () => {
  const result = await prisma.itemRequest.findMany();

  return result;
};

//** get items request status service */
const getSingleRequestedItemsService = async (requestId: string) => {
  const result = await prisma.itemRequest.findUniqueOrThrow({
    where: {
      requestId: requestId,
    },
    include: {
      store: true,
      user: true,
    },
  });

  return result;
};

//** get items request status service */
const getMyRequestedItemsService = async (user: JwtPayload) => {
  const result = await prisma.itemRequest.findMany({
    where: {
      user: {
        userCode: user.userCode,
      },
    },
  });

  return result;
};

export const requestService = {
  createRequestService,
  changeItemsRequestStatusService,
  getAllRequestedItemsService,
  getSingleRequestedItemsService,
  getMyRequestedItemsService,
};
