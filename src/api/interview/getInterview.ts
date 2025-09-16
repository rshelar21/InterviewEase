import { fetchRequest } from '@/lib/fetchRequest';

import { Meta, Interview } from '@/types';

// export async function getInterviews() {
//   const session = await getUser();

//   const res = await prisma.interview.findMany({
//     orderBy: {
//       createdAt: 'desc',
//     },
//     where: {
//       userId: session?.user?.id,
//     },
//   });

//   return res;
// }
interface ServerResponse {
  data: Interview[];
  meta: Meta;
}

export async function getInterviews(endpoint: string): Promise<ServerResponse> {
  return await fetchRequest(endpoint);
}
