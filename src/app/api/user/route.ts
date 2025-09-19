import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUser } from '@/api/user/getUser';

export async function GET() {
  try {
    const session = await getUser();

    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return NextResponse.json({
      data: user,
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
