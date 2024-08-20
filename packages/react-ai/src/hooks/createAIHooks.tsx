import { createUseAIGeneration, UseAIGenerationHook } from './useAIGeneration';
import { V6Client } from '@aws-amplify/api-graphql';
import {
  createUseAIConversation,
  UseAIConversationHook,
} from './useAIConversation';

export function createAIHooks<
  T extends Record<any, any> = never,
>(
  _client: V6Client<T>
): {
  useAIConversation: UseAIConversationHook<
    Extract<keyof V6Client<T>['conversations'], string>
  >;
  useAIGeneration: UseAIGenerationHook<Extract<keyof V6Client<T>['generations'], string>, T>;
} {
  const useAIConversation = createUseAIConversation(_client);
  const useAIGeneration = createUseAIGeneration<T>(_client);

  return { useAIConversation, useAIGeneration };
}
