import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(userValidation.createAdmin),
  userController.createAdmin,
);
router.post(
  '/create-manager',
  validateRequest(userValidation.createManager),
  userController.createManager,
);

router.get('/', userController.getAllUsers);

export const userRoutes = router;
