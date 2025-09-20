import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUser } from '@/data/user';
import { startOfWeek, endOfWeek } from 'date-fns';

export async function GET() {
  try {
    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 }); // 0 = Sunday, 1 = Monday
    const weekEnd = endOfWeek(today, { weekStartsOn: 1 });
    const session = await getUser();

    const interviews = await prisma.interview.findMany({
      where: {
        userId: session.user?.id,
        scheduledDate: {
          gte: weekStart,
          lte: weekEnd,
        },
        status: {
          not: 'COMPLETED',
          equals: 'SCHEDULED',
        },
      },
      select: {
        id: true,
        title: true,
        scheduleLater: true,
        status: true,
        createdAt: true,
        scheduledDate: true,
      },
    });

    return NextResponse.json({
      data: interviews,
      success: true,
      message: 'Notifications fetched successfully',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch notifications',
    });
  }
}
