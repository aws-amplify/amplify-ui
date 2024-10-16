import * as React from 'react';
import { DataState } from '@aws-amplify/ui-react-core';
import { V6Client } from '@aws-amplify/api-graphql';
import { getSchema } from '../types';

export interface UseAIGenerationHookWrapper<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> {
  useAIGeneration: <U extends Key>(
    routeName: U
  ) => [
    Awaited<GenerationState<Schema[U]['returnType']>>,
    (input: Schema[U]['args']) => void,
  ];
}

export type UseAIGenerationHook<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> = (
  routeName: Key
) => [
  Awaited<GenerationState<Schema[Key]['returnType']>>,
  (input: Schema[Key]['args']) => void,
];

type AIGenerationClient<T extends Record<any, any>> = Pick<
  V6Client<T>,
  'generations'
>;

interface GraphQLFormattedError {
  readonly message: string;
  readonly errorType: string;
  readonly errorInfo: null | {
    [key: string]: unknown;
  };
}

type SingularReturnValue<T> = {
  data: T | null;
  errors?: GraphQLFormattedError[];
};

type GenerationState<T> = Omit<DataState<T>, 'message'> & {
  messages?: GraphQLFormattedError[];
};

// default state
const INITIAL_STATE = {
  hasError: false,
  isLoading: false,
  messages: undefined,
};
const LOADING_STATE = { hasError: false, isLoading: true, messages: undefined };
const ERROR_STATE = { hasError: true, isLoading: false };

export function createUseAIGeneration<
  Client extends Record<'generations' | 'conversations', Record<string, any>>,
  Schema extends getSchema<Client>,
>(client: Client): UseAIGenerationHook<keyof Client['generations'], Client> {
  const useAIGeneration = <
    Key extends keyof AIGenerationClient<Schema>['generations'],
  >(
    routeName: Key
  ): [
    state: GenerationState<Schema[Key]['returnType']>,
    handleAction: (input: Schema[Key]['args']) => void,
  ] => {
    const [dataState, setDataState] = React.useState<
      GenerationState<Schema[Key]['returnType']>
    >(() => ({
      ...INITIAL_STATE,
      data: undefined,
    }));

    const handleGeneration = React.useCallback(
      async (input: Schema[Key]['args']) => {
        setDataState(({ data }) => ({ ...LOADING_STATE, data }));

        const result = await (
          client.generations as AIGenerationClient<Schema>['generations']
        )[routeName](input);

        const { data, errors } = result as SingularReturnValue<
          Schema[Key]['returnType']
        >;

        if (errors) {
          setDataState({
            ...ERROR_STATE,
            data,
            messages: errors,
          });
        } else {
          setDataState({ ...INITIAL_STATE, data });
        }
      },
      [routeName]
    );

    return [dataState, handleGeneration];
  };

  return useAIGeneration;
}
