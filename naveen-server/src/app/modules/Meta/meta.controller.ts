import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { metaService } from './meta.service';

const fetchDashboardMetaData = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const result = await metaService.fetchDashboardMetaData(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meta data retrival successfully!',
      data: result,
    });
  },
);

export const metaController = {
  fetchDashboardMetaData,
};
