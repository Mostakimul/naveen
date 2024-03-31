import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';

const createAdminService = async (
  payload: Pick<User, 'userCode' | 'password'>,
) => {
  const { userCode, password } = payload;

  const hashedPassword: string = await bcrypt.hash(password, 12);

  const userData = await prisma.user.create({
    data: {
      userCode,
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });
  return userData;
};

export const userService = {
  createAdminService,
};
