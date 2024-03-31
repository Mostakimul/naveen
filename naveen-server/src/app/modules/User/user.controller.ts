import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { userService } from './user.service';

//** create admin controller */
const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.createAdminService(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

//** create manager controller */
const createManager: RequestHandler = catchAsync(async (req, res) => {
  const result = await userService.createManagerService(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Manager created successfully!',
    data: result,
  });
});

export const userController = {
  createAdmin,
  createManager,
};
