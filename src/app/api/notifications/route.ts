import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUser } from '@/api/user/getUser';
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
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch interviews' },
      { status: 500 }
    );
  }
}
