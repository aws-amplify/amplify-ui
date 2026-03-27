import type { AmplifyContext } from 'aws-amplify';
import { getProperties } from 'aws-amplify/storage';
import type {
  GetPropertiesWithPathInput,
  GetPropertiesWithPathOutput,
} from 'aws-amplify/storage';

export async function safeGetProperties(
  ctx: AmplifyContext,
  params: GetPropertiesWithPathInput
): Promise<GetPropertiesWithPathOutput | {}> {
  try {
    return await getProperties(ctx, params);
  } catch {
    return {};
  }
}
