import { UserRole } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-admin',
  auth(UserRole.ADMIN),
  validateRequest(userValidation.createAdmin),
  userController.createAdmin,
);
router.post(
  '/create-manager',
  auth(UserRole.ADMIN, UserRole.WAREHOUSE_MANAGER),
  validateRequest(userValidation.createManager),
  userController.createManager,
);

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.WAREHOUSE_MANAGER),
  userController.getAllUsers,
);

router.get(
  '/:userId',
  auth(UserRole.ADMIN, UserRole.WAREHOUSE_MANAGER),
  userController.getSingleUser,
);

router.patch(
  '/soft-delete/:userId',
  auth(UserRole.ADMIN),
  userController.softDeleteUser,
);

router.patch('/:userId', auth(UserRole.ADMIN), userController.updateUser);

export const userRoutes = router;
