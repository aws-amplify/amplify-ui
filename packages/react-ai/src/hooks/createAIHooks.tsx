import {
  createUseAIGeneration,
  UseAIGenerationHookWrapper,
} from './useAIGeneration';
import {
  createUseAIConversation,
  UseAIConversationHook,
} from './useAIConversation';
import { getSchema } from '../types';

type UseAIHooks<
  Client extends Record<'generations' | 'conversations', Record<string, any>>,
  Schema extends Record<any, any>,
> = {
  useAIConversation: UseAIConversationHook<
    Extract<keyof Client['conversations'], string>
  >;
} & UseAIGenerationHookWrapper<keyof Client['generations'], Schema>;

/**
 * @experimental
 */
export function createAIHooks<
  Client extends Record<'generations' | 'conversations', Record<string, any>>,
  Schema extends getSchema<Client>,
>(_client: Client): UseAIHooks<Client, Schema> {
  const useAIConversation = createUseAIConversation(_client);
  const useAIGeneration = createUseAIGeneration(_client);

  return { useAIConversation, useAIGeneration };
}
