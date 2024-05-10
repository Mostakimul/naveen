import express from 'express';
import { authRoutes } from '../modules/Auth/auth.routes';
import { metaRoutes } from '../modules/Meta/meta.routes';
import { requestRoutes } from '../modules/Request/request.routes';
import { salesRoutes } from '../modules/Sales/sales.routes';
import { storeRoutes } from '../modules/Store/store.routes';
import { userRoutes } from '../modules/User/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/store',
    route: storeRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/sales',
    route: salesRoutes,
  },
  {
    path: '/requests',
    route: requestRoutes,
  },
  {
    path: '/meta',
    route: metaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
