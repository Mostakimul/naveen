import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { storeFilterableFields } from './store.constant';
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

//** get all store controller */
const getAllStores: RequestHandler = catchAsync(async (req, res) => {
  const finalQuery = pick(req.query, storeFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await storeService.getAllStoreService(finalQuery, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Stores retrived successfully!',
    meta: result.meta,
    data: result.data,
  });
});

//** change store manager controller */
const changeManager: RequestHandler = catchAsync(async (req, res) => {
  const { storeId } = req.params;

  const result = await storeService.changeManagerService(storeId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Store manager changed successfully!',
    data: result,
  });
});

export const storeController = {
  createStore,
  getAllStores,
  changeManager,
};
