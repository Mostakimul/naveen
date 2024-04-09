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

export const requestRoutes = router;
