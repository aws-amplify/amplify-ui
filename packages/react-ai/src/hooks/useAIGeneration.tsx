import { DataState, useDataState } from '@aws-amplify/ui-react-core';
import { V6Client as SDKV6Client } from '@aws-amplify/api-graphql';

interface UseAIGenerationInput {
  onError?: (error: Error) => void;
}

export interface UseAIGenerationHookWrapper<
  T extends keyof V6Client<K>['generations'],
  K extends Record<any, any>,
> {
  useAIGeneration: <U extends T>(
    routeName: U,
    input?: UseAIGenerationInput
  ) => [Awaited<DataState<K[U]['returnType']>>, (input: K[U]['args']) => void];
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
  generations: V6Client<T>['generations']
): UseAIGenerationHook<keyof V6Client<T>['generations'], T> {
  const useAIGeneration = <K extends keyof V6Client<T>['generations']>(
    routeName: K,
    _input?: UseAIGenerationInput
  ) => {
    const handleGenerate = generations[routeName];

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
