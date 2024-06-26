import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { storeController } from './store.controller';
import { storeValidation } from './store.validation';

const router = express.Router();

router.post(
  '/create-store',
  auth(UserRole.ADMIN, UserRole.WAREHOUSE_MANAGER),
  validateRequest(storeValidation.createStore),
  storeController.createStore,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.WAREHOUSE_MANAGER),
  storeController.getAllStores,
);

router.patch(
  '/change-manager/:storeId',
  auth(UserRole.ADMIN),
  storeController.changeManager,
);

router.delete('/:storeId', auth(UserRole.ADMIN), storeController.deleteStore);

export const storeRoutes = router;
