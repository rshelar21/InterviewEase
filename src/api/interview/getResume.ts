import { fetchRequest } from '@/lib/fetchRequest';

import { Resume } from '@/types';
interface ServerResponse {
  data: Resume;
}

export async function getResume(endpoint: string): Promise<ServerResponse> {
  return await fetchRequest(endpoint);
}
