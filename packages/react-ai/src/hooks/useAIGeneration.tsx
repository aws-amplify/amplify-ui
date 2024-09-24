import { DataState, useDataState } from '@aws-amplify/ui-react-core';
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
    const [graphqlErrors, setGraphqlErrors] = React.useState<
      GraphQLFormattedError[] | undefined
    >(undefined);

    const handleGenerate = (
      client.generations as AIGenerationClient<Schema>['generations']
    )[routeName];

    const updateAIGenerationStateAction = async (
      _prev: Schema[Key]['returnType'],
      input: Schema[Key]['args']
    ): Promise<Schema[Key]['returnType']> => {
      const result = await handleGenerate(input);

      const { data, errors } = result as SingularReturnValue<
        Schema[Key]['returnType']
      >;
      setGraphqlErrors(errors);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    };

    const [data, handler] = useDataState(
      updateAIGenerationStateAction,
      undefined
    );
    return [{ ...data, graphqlErrors }, handler];
  };

  return useAIGeneration;
}
