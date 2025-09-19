import { fetchRequest } from '@/lib/fetchRequest';

import { Interview } from '@/types';

interface ServerResponse {
  data: Interview[];
}

export async function getInterviewNofications(
  endpoint: string
): Promise<ServerResponse> {
  return await fetchRequest(endpoint);
}
