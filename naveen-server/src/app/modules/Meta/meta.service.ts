import { UserRole } from '@prisma/client';
import { endOfMonth, startOfMonth } from 'date-fns';
import { JwtPayload } from 'jsonwebtoken';
import prisma from '../../../shared/prisma';

const fetchDashboardMetaData = async (user: JwtPayload) => {
  let metaData;
  switch (user?.role) {
    case UserRole.ADMIN:
      metaData = getAdminMetaData();
      break;
    default:
      throw new Error('Invalid user role!');
  }

  return metaData;
};

const getAdminMetaData = async () => {
  const userCount = await prisma.user.count();
  const storeCount = await prisma.store.count();
  const itemRequestCount = await prisma.itemRequest.count();
  const salesCount = await prisma.sales.count();

  const barChartData = await getSalesCountByMonthData();

  return {
    userCount,
    storeCount,
    itemRequestCount,
    salesCount,
    barChartData,
  };
};

const getSalesCountByMonthData = async () => {
  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  const monthlySales = await prisma.sales.groupBy({
    by: ['storeId'],
    where: {
      AND: [{ date: { gte: startDate } }, { date: { lte: endDate } }],
    },
    _sum: {
      amount: true,
    },
  });

  return monthlySales;
};

export const metaService = {
  fetchDashboardMetaData,
};
