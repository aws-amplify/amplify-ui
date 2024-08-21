import { DataState, useDataState } from '@aws-amplify/ui-react-core';
import { V6Client as SDKV6Client } from '@aws-amplify/api-graphql';

interface UseAIGenerationInput {
  onError?: (error: Error) => void;
}

export type UseAIGenerationHook<
  T extends keyof V6Client<K>['generations'],
  K extends Record<any, any>,
> = (
  routeName: T,
  input?: UseAIGenerationInput
) => [Awaited<DataState<K[T]['returnType']>>, (input: K[T]['args']) => void];

type V6Client<T extends Record<any, any>> = Pick<SDKV6Client<T>, 'generations'>;

export function createUseAIGeneration<T extends Record<any, any> = never>(
  client: V6Client<T>
): UseAIGenerationHook<keyof V6Client<T>['generations'], T> {
  const useAIGeneration = <K extends keyof V6Client<T>['generations']>(
    routeName: K,
    _input?: UseAIGenerationInput
  ) => {
    const handleGenerate = client.generations[routeName];

    const updateAIGenerationStateAction = async (
      prev: T[K]['returnType'],
      input: T[K]['args']
    ): Promise<T[K]['returnType']> => {
      const result = await handleGenerate(input);

      return { ...result };
    };

    return useDataState(updateAIGenerationStateAction, {});
  };

  return useAIGeneration;
}
