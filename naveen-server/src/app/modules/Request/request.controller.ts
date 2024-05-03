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
const changeItemRequestStatus: RequestHandler = catchAsync(async (req, res) => {
  const { reqId } = req.params;
  const result = await requestService.changeItemsRequestStatusService(
    reqId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Item request status updated successfully!',
    data: result,
  });
});

//** create item request controller */
const getAllRequestedItems: RequestHandler = catchAsync(async (req, res) => {
  const result = await requestService.getAllRequestedItemsService();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All items request retrived successfully!',
    data: result,
  });
});

export const requestController = {
  createItemRequest,
  changeItemRequestStatus,
  getAllRequestedItems,
};
