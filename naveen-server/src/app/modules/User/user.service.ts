import { Prisma, User, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { paginationHelper } from '../../../helpers/paginationHelper';
import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../interfaces/pagination';
import { userSearchableFields } from './user.constant';

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

//** get all users */
const getAllUserService = async (params: any, options: IPaginationOptions) => {
  const { searchTerm, ...filterData } = params;

  const { page, limit, sortBy, sortOrder, skip } =
    paginationHelper.calculatePagination(options);

  const andConditions: Prisma.UserWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? { [sortBy]: sortOrder }
        : {
            createdAt: 'desc',
          },
    select: {
      userId: true,
      userCode: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const userService = {
  createAdminService,
  createManagerService,
  getAllUserService,
};
