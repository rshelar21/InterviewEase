import { getUser } from '@/api/user/getUser';
import prisma from '@/lib/db';
import {
  startOfWeek,
  endOfWeek,
  subMonths,
  startOfMonth,
  endOfMonth,
} from 'date-fns';

export async function getAnalyticsDetails() {
  const session = await getUser();
  const today = new Date();

  const sixMonthsAgo = subMonths(today, 6);

  // Tomorrow start (midnight)
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 0 = Sunday, 1 = Monday
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
  const monthStart = startOfMonth(today); // e.g. 2025-09-01T00:00:00
  const monthEnd = endOfMonth(today);

  const [totalInterviews, upcomingThisWeek, lastSixMonths] = await Promise.all([
    prisma.interview.count({
      where: {
        userId: session?.user?.id,
        createdAt: {
          gte: monthStart,
          lte: monthEnd,
        },
        scheduledDate: {
          gte: monthStart,
          lte: monthEnd,
        },
        status: {
          equals: 'COMPLETED',
        },
      },
    }),

    prisma.interview.count({
      where: {
        userId: session?.user?.id,
        scheduledDate: {
          gte: weekStart,
          lte: weekEnd,
        },
        status: {
          not: 'COMPLETED',
          equals: 'SCHEDULED',
        },
      },
    }),

    prisma.interview.findMany({
      where: {
        userId: session?.user?.id,
        createdAt: { gte: sixMonthsAgo },
        status: {
          equals: 'COMPLETED',
        },
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        companyName: true,
        createdAt: true,
        duration: true,
        interviewType: true,
        rating: true,
        scheduledDate: true,
        scheduleLater: true,
        title: true,
        score: true,
      },
    }),

    //   prisma.interview.findMany({
    //     where: { userId: session?.user?.id },
    //     orderBy: { createdAt: 'desc' },
    //     take: 5,
    //   }),
  ]);

  //   const totolInterviews = await prisma.interview.count({
  //     where: {
  //       userId: session?.user?.id,
  //     },
  //   });

  //   const interview = await prisma.interview.findMany({
  //     where: {
  //       userId: session?.user?.id,
  //       createdAt: {
  //         gte: sixMonthsAgo,
  //       },
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });

  //   const thisWeek = await prisma.interview.findMany({
  //     where: {
  //       userId: session?.user?.id,
  //       createdAt: {
  //         gte: currentWeek,
  //       },
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });

  //   return {
  //     totolInterviews,
  //   };

  return {
    totalInterviews,
    upcomingThisWeek,
    lastSixMonths,
  };
}
