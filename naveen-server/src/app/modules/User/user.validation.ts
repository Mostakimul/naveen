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

export const userValidation = {
  createAdmin,
};
