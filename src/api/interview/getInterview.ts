import { fetchRequest } from '@/lib/fetchRequest';

import { Meta, Interview } from '@/types';

interface ServerResponse {
  data: Interview[];
  meta: Meta;
}

export async function getInterviews(endpoint: string): Promise<ServerResponse> {
  return await fetchRequest(endpoint);
}
