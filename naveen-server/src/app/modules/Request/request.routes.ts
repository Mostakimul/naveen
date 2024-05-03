import { UserRole } from '@prisma/client';
import express from 'express';
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

router.put(
  '/change-status/:reqId',
  auth(UserRole.ADMIN),
  validateRequest(requestValidation.updateRequestStatusSchema),
  requestController.changeItemRequestStatus,
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
