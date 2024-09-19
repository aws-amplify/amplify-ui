import { DataState } from '@aws-amplify/ui-react-core';
import { V6Client } from '@aws-amplify/api-graphql';
import { getSchema } from '../types';
import React from 'react';

export interface UseAIGenerationHookWrapper<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> {
  useAIGeneration: <U extends Key>(
    routeName: U
  ) => [
    Awaited<GenerateState<Schema[U]['returnType']>>,
    (input: Schema[U]['args']) => void,
  ];
}

export type UseAIGenerationHook<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> = (
  routeName: Key
) => [
  Awaited<GenerateState<Schema[Key]['returnType']>>,
  (input: Schema[Key]['args']) => void,
];

type AIGenerationClient<T extends Record<any, any>> = Pick<
  V6Client<T>,
  'generations'
>;

const INITIAL_STATE = { hasError: false, isLoading: false, message: undefined };
const LOADING_STATE = { hasError: false, isLoading: true, message: undefined };
const ERROR_STATE = { hasError: true, isLoading: false };

interface GraphQLFormattedError {
  readonly message: string;
  readonly errorType: string;
  readonly errorInfo: null | {
    [key: string]: unknown;
  };
}

type SingularReturnValue<T> = Promise<{
  data: T | null;
  errors?: GraphQLFormattedError[];
}>;

type GenerateState<T> = DataState<T> & {
  graphqlErrors?: GraphQLFormattedError[];
};

export function createUseAIGeneration<
  Client extends Record<'generations' | 'conversations', Record<string, any>>,
  Schema extends getSchema<Client>,
>(client: Client): UseAIGenerationHook<keyof Client['generations'], Client> {
  const useAIGeneration = <
    Key extends keyof AIGenerationClient<Schema>['generations'],
  >(
    routeName: Key
  ): [
    state: GenerateState<Schema[Key]['returnType']>,
    handleAction: (input: Schema[Key]['args']) => void,
  ] => {
    const [dataState, setDataState] = React.useState<
      GenerateState<Schema[Key]['returnType']>
    >(() => ({
      ...INITIAL_STATE,
      data: undefined,
    }));

    const handleGenerate = (
      client.generations as AIGenerationClient<Schema>['generations']
    )[routeName];

    const generateHandler: (input: Schema[Key]['args']) => void =
      React.useCallback(
        (input) => {
          setDataState(({ data }) => ({ ...LOADING_STATE, data }));

          const promiseResult = handleGenerate(input);

          (promiseResult as SingularReturnValue<Schema[Key]['returnType']>)
            .then(({ data, errors }) => {
              setDataState({ ...INITIAL_STATE, data, graphqlErrors: errors });
            })
            .catch(({ message }: Error) => {
              setDataState(({ data, graphqlErrors }) => ({
                ...ERROR_STATE,
                data,
                message,
                graphqlErrors,
              }));
            });
        },
        [handleGenerate]
      );

    return [dataState, generateHandler];
  };

  return useAIGeneration;
}
