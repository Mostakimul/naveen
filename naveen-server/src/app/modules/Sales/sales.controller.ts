import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { salesFilterableFields } from './sales.constant';
import { salesService } from './sales.service';

//** create sales controller */
const createSales: RequestHandler = catchAsync(async (req, res) => {
  const result = await salesService.createSalesService(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Sales added successfully!',
    data: result,
  });
});

//** get all sales controller */
const getAllSales: RequestHandler = catchAsync(async (req, res) => {
  const finalQuery = pick(req.query, salesFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await salesService.getAllSalesService(finalQuery, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales retrived successfully!',
    meta: result.meta,
    data: result.data,
  });
});

//** get sales by store Id controller */
const getSalesByStoreId: RequestHandler = catchAsync(async (req, res) => {
  const { storeId } = req.params;

  const result = await salesService.getSalesByStoreId(storeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sales retrived successfully!',
    data: result,
  });
});

export const salesController = {
  createSales,
  getAllSales,
  getSalesByStoreId,
};
