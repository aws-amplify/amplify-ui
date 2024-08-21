import { createUseAIGeneration, UseAIGenerationHook } from './useAIGeneration';
import {
  createUseAIConversation,
  UseAIConversationHook,
} from './useAIConversation';
import {
  ConversationRoutes,
  Generations,
} from '@aws-amplify/data-schema/dist/esm/runtime';

type FakeClient<T extends Record<any, any>> = {
  [K in 'generations' | 'conversations']: K extends 'generations'
    ? Generations<T>
    : ConversationRoutes<T>;
};
type getSchema<T> = T extends FakeClient<infer U> ? U : never;

export function createAIHooks<T extends Record<any, any>>(
  _client: FakeClient<T>
): {
  useAIConversation: UseAIConversationHook<
    Extract<keyof FakeClient<T>['conversations'], string>
  >;
  useAIGeneration: UseAIGenerationHook<
    keyof FakeClient<T>['generations'],
    getSchema<FakeClient<T>>
  >;
} {
  const useAIConversation = createUseAIConversation(_client);
  const useAIGeneration = createUseAIGeneration(_client);

  return { useAIConversation, useAIGeneration };
}
