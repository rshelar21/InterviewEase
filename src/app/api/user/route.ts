import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { getUser } from '@/data/user';

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
      success: true,
      message: 'User fetched successfully',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to fetch user',
    });
  }
}
