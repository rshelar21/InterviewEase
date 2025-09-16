import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUser } from '@/api/user/getUser';

export async function GET(req: NextRequest) {
  try {
    const session = await getUser();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '12', 10);

    const skip = (page - 1) * limit;

    const totalItems = await prisma.interview.count({
      where: { userId: session?.user?.id },
    });

    const interviews = await prisma.interview.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      where: {
        userId: session?.user?.id,
      },
    });

    const totalPages = Math.ceil(totalItems / limit);

    const hasNextPage = page === totalPages || totalPages === 0 ? false : true;
    const nextPage = page === totalPages || totalPages === 0 ? page : page + 1;

    const previoudPage = page === 1 || totalPages === 0 ? page : page - 1;

    return NextResponse.json({
      data: interviews,
      meta: {
        totalItems,
        totalPages,
        nextPage,
        previoudPage,
        hasNextPage,
      },
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
