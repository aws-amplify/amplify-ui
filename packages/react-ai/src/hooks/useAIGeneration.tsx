import { Generations } from '@aws-amplify/data-schema/dist/esm/runtime';
import { DataState, useDataState } from '@aws-amplify/ui-react-core';

interface UseAIGenerationInput {
  onError?: (error: Error) => void;
}

export type UseAIGenerationHook<T, U, V> = (
  routeName: T,
  input?: UseAIGenerationInput
) => [
    Awaited<DataState<V>>,
    (input: U) => void,
  ];

export function createUseAIGeneration<T extends Record<'generations', Generations<any>>>(client: T):
  UseAIGenerationHook<Extract<keyof T['generations'], string>, Parameters<T['generations'][string]>, ReturnType<T['generations'][string]>> {
  const useAIGeneration = (
    routeName: Extract<keyof T['generations'], string>,
    _input?: UseAIGenerationInput
  ) => {
    const handleGenerate = client.generations[routeName];

    const updateAIGenerationStateAction = async (
      prev: ReturnType<typeof handleGenerate>,
      input: Parameters<typeof handleGenerate>
    ): Promise<ReturnType<typeof handleGenerate>> => {
      const { data, errors } = await handleGenerate(input);

      return { ...data };
    };

    return useDataState(updateAIGenerationStateAction, {});
  };

  return useAIGeneration;
}
