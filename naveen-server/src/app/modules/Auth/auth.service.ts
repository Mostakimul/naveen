import * as bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import { config } from '../../../config';
import { jwtHelper } from '../../../helpers/jwtHelper';
import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';

// * login service
const loginService = async (payload: {
  userCode: string;
  password: string;
}) => {
  const { userCode, password } = payload;
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      userCode,
    },
  });

  const isPasswordCorrect: boolean = await bcrypt.compare(
    password,
    userData.password,
  );

  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect!');
  }

  const accessToken = jwtHelper.generateToken(
    {
      userCode: userData.userCode,
      role: userData.role,
    },
    config.jwt_secret_key as Secret,
    config.jwt_expire_in as string,
  );

  const refreshToken = jwtHelper.generateToken(
    {
      userCode: userData.userCode,
      role: userData.role,
    },
    config.jwt_refresh_secret_key as Secret,
    config.jwt_refresh_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

// * refresh service
const refreshTokenService = async (token: string) => {
  const decodedData = jwtHelper.verifyToken(
    token,
    config.jwt_refresh_secret_key as Secret,
  );

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      userCode: decodedData?.userCode,
    },
  });

  const accessToken = jwtHelper.generateToken(
    {
      userCode: userData.userCode,
      role: userData.role,
    },
    config.jwt_secret_key as Secret,
    config.jwt_expire_in as string,
  );

  return {
    accessToken,
  };
};

export const authService = {
  loginService,
  refreshTokenService,
};
