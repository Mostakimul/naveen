import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { config } from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { authService } from './auth.service';

// * login controller
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

// * refresh controller
const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await authService.refreshTokenService(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token generated successfully!',
    data: result,
  });
});

export const authController = {
  loginUser,
  refreshToken,
};
