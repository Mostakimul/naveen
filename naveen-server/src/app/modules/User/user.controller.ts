import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { userFilterableFields } from './user.constant';
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

//** get all user controller */
const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  const finalQuery = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await userService.getAllUserService(finalQuery, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrived successfully!',
    meta: result.meta,
    data: result.data,
  });
});

//** get all user controller */
const softDeleteUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await userService.softDeleteUserService(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully!',
    data: result,
  });
});

//** update user controller */
const updateUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await userService.updateUserService(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully!',
    data: result,
  });
});

//** get single user controller */
const getSingleUser: RequestHandler = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await userService.getSingleUserService(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrived successfully!',
    data: result,
  });
});

export const userController = {
  createAdmin,
  createManager,
  getAllUsers,
  softDeleteUser,
  updateUser,
  getSingleUser,
};
