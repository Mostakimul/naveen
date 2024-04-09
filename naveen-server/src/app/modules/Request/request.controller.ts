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

export const requestController = {
  createItemRequest,
};
