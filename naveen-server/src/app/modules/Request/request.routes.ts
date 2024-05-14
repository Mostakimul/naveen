import { UserRole } from '@prisma/client';
import express, { NextFunction, Request, Response } from 'express';
import { fileUploader } from '../../../helpers/fileUploader';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { requestController } from './request.controller';
import { requestValidation } from './request.validation';

const router = express.Router();

router.post(
  '/send-request',
  auth(
    UserRole.STORE_MANAGER,
    UserRole.RESTAURANT_MANAGER,
    UserRole.ADMIN,
    UserRole.RESTAURANT_MANAGER,
  ),
  validateRequest(requestValidation.createRequestSchema),
  requestController.createItemRequest,
);

router.patch(
  '/:reqId',
  auth(UserRole.ADMIN, UserRole.WAREHOUSE_MANAGER),
  fileUploader.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = requestValidation.updateRequestStatusSchema.parse(
      JSON.parse(req.body.data),
    );
    return requestController.updateItemRequest(req, res, next);
  },
);

router.get(
  '/my-request',
  auth(
    UserRole.ADMIN,
    UserRole.WAREHOUSE_MANAGER,
    UserRole.RESTAURANT_MANAGER,
    UserRole.STORE_MANAGER,
  ),
  requestController.getMyRequestedItems,
);

router.get(
  '/:requestId',
  auth(UserRole.ADMIN, UserRole.WAREHOUSE_MANAGER),
  requestController.getSingleRequestedItems,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.WAREHOUSE_MANAGER),
  requestController.getAllRequestedItems,
);

export const requestRoutes = router;
