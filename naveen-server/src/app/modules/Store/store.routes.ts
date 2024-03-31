import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { storeController } from './store.controller';
import { storeValidation } from './store.validation';

const router = express.Router();

router.post(
  '/create-store',
  validateRequest(storeValidation.createStore),
  storeController.createStore,
);

export const storeRoutes = router;
