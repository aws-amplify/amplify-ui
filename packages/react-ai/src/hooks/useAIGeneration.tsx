import { V6Client } from '@aws-amplify/api-graphql';
import { ActionState, useDataState } from '@aws-amplify/ui-react-core';

interface GenerateParameters {
  arguments: string | string[] | number;
}

interface UseAIGenerationInput {
  onError?: (error: Error) => void;
}

interface AIGenerationState {
  result?: string;
}

export type UseAIGenerationHook<T extends string> = (
  routeName: T,
  input?: UseAIGenerationInput
) => [
  Awaited<ActionState<AIGenerationState>>,
  (input: GenerateParameters) => void,
];

export function createUseAIGeneration<T extends V6Client<any>>(
  _client: T
): UseAIGenerationHook<Extract<keyof T['models'], string>> {
  const useAIGeneration = (
    _routeName: keyof T['models'],
    _input?: UseAIGenerationInput
  ) => {
    // return useDataState(client.ai.generation as T['ai'])[routeName].generate, { messages: [] });
    // const generate = client.ai.generate as T['ai'])[routeName];

    // const newAction = async (_prev: { result: string }, _input: GenerateParameters) => {
    //   const result = await generate(_input);
    //   return { result }
    // }

    const updateAIGenerationStateAction = async (
      _prev: AIGenerationState,
      _input: GenerateParameters
    ): Promise<AIGenerationState> => {
      await new Promise((r) => setTimeout(r, 500));
      return { result: 'generatedresult' };
    };

    return useDataState(updateAIGenerationStateAction, {});
  };

  return useAIGeneration;
}
