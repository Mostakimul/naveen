import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { salesController } from './sales.controller';

const router = express.Router();

router.get(
  '/my-sales',
  auth(
    UserRole.STORE_MANAGER,
    UserRole.RESTAURANT_MANAGER,
    UserRole.WAREHOUSE_MANAGER,
  ),
  salesController.getMySales,
);

router.post(
  '/add-sale',
  auth(UserRole.STORE_MANAGER, UserRole.RESTAURANT_MANAGER, UserRole.ADMIN),
  salesController.createSales,
);

router.get(
  '/:storeId',
  auth(UserRole.ADMIN, UserRole.RESTAURANT_MANAGER, UserRole.STORE_MANAGER),
  salesController.getSalesByStoreId,
);

router.get('/', auth(UserRole.ADMIN), salesController.getAllSales);

export const salesRoutes = router;
