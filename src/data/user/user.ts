import { getUser } from '@/api/user/getUser';
import prisma from '@/lib/db';

export async function getUserInfo() {
  try {
    const session = await getUser();

    const user = await prisma.user.findUnique({
      where: {
        id: session.user?.id,
      },
      include: {
        Reusme: true,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
  }
}
