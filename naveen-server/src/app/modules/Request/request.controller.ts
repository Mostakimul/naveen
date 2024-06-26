import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { requestService } from './request.service';

//** create item request controller */
const createItemRequest: RequestHandler = catchAsync(async (req, res) => {
  const result = await requestService.createRequestService(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Item request added successfully!',
    data: result,
  });
});

//** create item request controller */
const updateItemRequest: RequestHandler = catchAsync(async (req, res) => {
  const { reqId } = req.params;
  const result = await requestService.updateItemsRequestService(reqId, req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Item request updated successfully!',
    data: result,
  });
});

//** get all item request controller */
const getAllRequestedItems: RequestHandler = catchAsync(async (req, res) => {
  const result = await requestService.getAllRequestedItemsService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All items request retrived successfully!',
    data: result,
  });
});

//** get single item request controller */
const getSingleRequestedItems: RequestHandler = catchAsync(async (req, res) => {
  const { requestId } = req.params;
  const result = await requestService.getSingleRequestedItemsService(requestId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Request item retrived successfully!',
    data: result,
  });
});

//** get my item request controller */
const getMyRequestedItems: RequestHandler = catchAsync(async (req, res) => {
  const result = await requestService.getMyRequestedItemsService(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My requestd item retrived successfully!',
    data: result,
  });
});

export const requestController = {
  createItemRequest,
  updateItemRequest,
  getAllRequestedItems,
  getSingleRequestedItems,
  getMyRequestedItems,
};
