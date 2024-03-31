import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.post(
  '/create-admin',
  (req: Request, res: Response, next: NextFunction) => {
    res.send('Create-admin router.....');
  },
);

export const userRoutes = router;
