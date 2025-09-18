import { fetchRequest } from '@/lib/fetchRequest';
import { Interview } from '@/types';

interface ServerResponse {
  data: Interview;
}

export async function postInterview(
  endpoint: string,
  config?: {
    method: string;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    body: any;
  }
): Promise<ServerResponse> {
  return await fetchRequest(endpoint, config);
}

export async function updateInterview(
  endpoint: string,
  config?: {
    method: string;
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    body: any;
  }
): Promise<ServerResponse> {
  return await fetchRequest(endpoint, config);
}
