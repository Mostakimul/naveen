import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import { salesController } from './sales.controller';

const router = express.Router();

router.post(
  '/add-sale',
  auth(UserRole.STORE_MANAGER, UserRole.RESTAURANT_MANAGER, UserRole.ADMIN),
  salesController.createSales,
);

export const salesRoutes = router;
