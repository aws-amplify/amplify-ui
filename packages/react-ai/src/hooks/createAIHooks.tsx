import {
  createUseAIGeneration,
  UseAIGenerationHookWrapper,
} from './useAIGeneration';
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

type UseAIHooks<T extends Record<any, any>> = {
  useAIConversation: UseAIConversationHook<
    Extract<keyof FakeClient<T>['conversations'], string>
  >;
} & UseAIGenerationHookWrapper<
  keyof FakeClient<T>['generations'],
  getSchema<FakeClient<T>>
>;

export function createAIHooks<T extends Record<any, any>>(
  _client: FakeClient<T>
): UseAIHooks<T> {
  const useAIConversation = createUseAIConversation(_client);
  const useAIGeneration = createUseAIGeneration(_client.generations);

  return { useAIConversation, useAIGeneration };
}
