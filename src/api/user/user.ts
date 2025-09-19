import { fetchRequest } from '@/lib/fetchRequest';
import { User } from '@prisma/client';

interface ServerResponse {
  data: User;
}

export async function getUserDetails(
  endpoint: string
): Promise<ServerResponse> {
  return await fetchRequest(endpoint);
}
