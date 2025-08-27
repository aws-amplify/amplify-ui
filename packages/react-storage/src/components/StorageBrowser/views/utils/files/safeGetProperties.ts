import { getProperties } from 'aws-amplify/storage';
import type {
  GetPropertiesWithPathInput,
  GetPropertiesWithPathOutput,
} from 'aws-amplify/storage';

export async function safeGetProperties(
  params: GetPropertiesWithPathInput
): Promise<GetPropertiesWithPathOutput | {}> {
  try {
    return await getProperties(params);
  } catch (error) {
    return {};
  }
}
