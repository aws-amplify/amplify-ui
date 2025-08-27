import { getProperties } from 'aws-amplify/storage';
import type { GetPropertiesWithPathOutput } from 'aws-amplify/storage';

export async function safeGetProperties(params: {
  path: string;
}): Promise<GetPropertiesWithPathOutput | {}> {
  try {
    return await getProperties(params);
  } catch (error) {
    return {};
  }
}
