import { User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';

//** create admin service */
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

  const { password: _, ...result } = userData;
  return result;
};

//** create manager service */
const createManagerService = async (payload: User) => {
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  const userData = await prisma.user.create({
    data: {
      userCode: payload.userCode,
      password: hashedPassword,
      role: payload.role,
    },
  });

  const { password: _, ...result } = userData;
  return result;
};

export const userService = {
  createAdminService,
  createManagerService,
};
