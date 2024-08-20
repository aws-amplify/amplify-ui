import { DataState, useDataState } from '@aws-amplify/ui-react-core';
import { V6Client } from '@aws-amplify/api-graphql';

interface UseAIGenerationInput {
  onError?: (error: Error) => void;
}

export type UseAIGenerationHook<T, K extends Record<any, any>> = (
  routeName: T,
  input?: UseAIGenerationInput
) => [
    Awaited<DataState<K[T]['returnType']>>,
    (input: K[T]['args']) => void,
  ];

export function createUseAIGeneration<T extends Record<any, any> = never>(client: V6Client<T>):
  UseAIGenerationHook<Extract<keyof V6Client<T>['generations'], string>, T> {
  const useAIGeneration = (
    routeName: Extract<keyof V6Client<T>['generations'], string>,
    _input?: UseAIGenerationInput
  ) => {
    const handleGenerate = client.generations[routeName];

    const updateAIGenerationStateAction = async (
      prev: T[Extract<keyof V6Client<T>['generations'], string>]['returnType'],
      input: T[Extract<keyof V6Client<T>['generations'], string>]['args']
    ): Promise<T[Extract<keyof V6Client<T>['generations'], string>]['returnType']> => {
      const { data, errors } = await handleGenerate(input);

      return { ...data };
    };

    return useDataState(updateAIGenerationStateAction, {});
  };

  return useAIGeneration;
}
