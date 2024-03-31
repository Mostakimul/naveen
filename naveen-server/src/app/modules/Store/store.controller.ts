import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { storeService } from './store.service';

//** create store controller */
const createStore: RequestHandler = catchAsync(async (req, res) => {
  const result = await storeService.createStoreService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Store created successfully!',
    data: result,
  });
});

export const storeController = {
  createStore,
};
