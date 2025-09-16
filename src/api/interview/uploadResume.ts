import { fetchRequest } from '@/lib/fetchRequest';
import { Resume } from '@/types';
interface ServerResponse {
  resume: Resume;
}

interface ServerResponseSignUrl {
  signature: string;
  timestamp: string;
  folder: string;
  cloud_name: string;
  api_key: string;
}

export async function getSignUrl(
  endpoint: string
): Promise<ServerResponseSignUrl> {
  return await fetchRequest(endpoint);
}

export async function uploadResume(
  endpoint: string,
  config?: {
    method: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body?: any;
  }
): Promise<ServerResponse> {
  return await fetchRequest(endpoint, config);
}
