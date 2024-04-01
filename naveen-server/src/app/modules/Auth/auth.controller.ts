import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { config } from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await authService.loginService(req.body);
  const { refreshToken, accessToken } = result;

  // * save in cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.env === 'development' ? false : true,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in successfully!',
    data: {
      accessToken,
    },
  });
});

export const authController = {
  loginUser,
};
