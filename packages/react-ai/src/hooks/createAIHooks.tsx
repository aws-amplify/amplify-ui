import { createUseAIGeneration, UseAIGenerationHook } from './useAIGeneration';
import {
  createUseAIConversation,
  UseAIConversationHook,
} from './useAIConversation';

export function createAIHooks<
  T extends Record<'generations' | 'conversations', Record<string, any>>,
>(
  _client: T
): {
  useAIConversation: UseAIConversationHook<
    Extract<keyof T['conversations'], string>
  >;
  useAIGeneration: UseAIGenerationHook<Extract<keyof T['generations'], string>>;
} {
  const useAIConversation = createUseAIConversation(_client);
  const useAIGeneration = createUseAIGeneration(_client);

  return { useAIConversation, useAIGeneration };
}
