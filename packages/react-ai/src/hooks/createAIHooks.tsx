import type { UseAIGenerationHookWrapper } from './useAIGeneration';
import { createUseAIGeneration } from './useAIGeneration';
import type { UseAIConversationHook } from './useAIConversation';
import { createUseAIConversation } from './useAIConversation';
import type { getSchema } from '../types';

type UseAIHooks<
  Client extends Record<'generations' | 'conversations', Record<string, any>>,
  Schema extends Record<any, any>,
> = {
  useAIConversation: UseAIConversationHook<
    Extract<keyof Client['conversations'], string>
  >;
} & UseAIGenerationHookWrapper<keyof Client['generations'], Schema>;

export function createAIHooks<
  Client extends Record<'generations' | 'conversations', Record<string, any>>,
  Schema extends getSchema<Client>,
>(_client: Client): UseAIHooks<Client, Schema> {
  const useAIConversation = createUseAIConversation(_client);
  const useAIGeneration = createUseAIGeneration(_client);

  return { useAIConversation, useAIGeneration };
}
