import { V6Client } from '@aws-amplify/api-graphql';
import { createUseAIGeneration, UseAIGenerationHook } from './useAIGeneration';
import {
  createUseAIConversation,
  UseAIConversationHook,
} from './useAIConversation';

export function createAIHooks<T extends V6Client<any>>(
  _client: T
): {
  useAIConversation: UseAIConversationHook<Extract<keyof T['models'], string>>;
  useAIGeneration: UseAIGenerationHook<Extract<keyof T['models'], string>>;
} {
  const useAIConversation = createUseAIConversation(_client);
  const useAIGeneration = createUseAIGeneration(_client);

  return { useAIConversation, useAIGeneration };
}
