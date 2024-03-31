import { UserRole } from '@prisma/client';
import { z } from 'zod';
const createAdmin = z.object({
  body: z.object({
    userCode: z.string({
      required_error: 'User code is required!',
    }),
    password: z.string({
      required_error: 'Password is required!',
    }),
  }),
});

const createManager = z.object({
  body: z.object({
    userCode: z.string({
      required_error: 'User code is required!',
    }),
    password: z.string({
      required_error: 'Password is required!',
    }),
    role: z.enum([
      UserRole.ADMIN,
      UserRole.RESTAURANT_MANAGER,
      UserRole.STORE_MANAGER,
      UserRole.WAREHOUSE_MANAGER,
    ]),
  }),
});

export const userValidation = {
  createAdmin,
  createManager,
};
