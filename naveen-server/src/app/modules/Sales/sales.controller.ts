import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
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

export const salesController = {
  createSales,
};
