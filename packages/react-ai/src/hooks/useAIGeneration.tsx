import { DataState, useDataState } from '@aws-amplify/ui-react-core';
import { V6Client } from '@aws-amplify/api-graphql';
import { getSchema } from '../types';

export interface UseAIGenerationHookWrapper<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> {
  useAIGeneration: <U extends Key>(
    routeName: U
  ) => [
    Awaited<DataState<Schema[U]['returnType']>>,
    (input: Schema[U]['args']) => void,
  ];
}

export type UseAIGenerationHook<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> = (
  routeName: Key
) => [
  Awaited<DataState<Schema[Key]['returnType']>>,
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

export function createUseAIGeneration<
  Client extends Record<'generations' | 'conversations', Record<string, any>>,
  Schema extends getSchema<Client>,
>(client: Client): UseAIGenerationHook<keyof Client['generations'], Client> {
  const useAIGeneration = <
    Key extends keyof AIGenerationClient<Schema>['generations'],
  >(
    routeName: Key
  ) => {
    const handleGenerate = (
      client.generations as AIGenerationClient<Schema>['generations']
    )[routeName];

    const updateAIGenerationStateAction = async (
      _prev: Schema[Key]['returnType'],
      input: Schema[Key]['args']
    ): Promise<
      Schema[Key]['returnType'] & { graphqlErrors?: GraphQLFormattedError[] }
    > => {
      const result = await handleGenerate(input);

      // handleGenerate returns a Promised wrapper around Schema[Key]['returnType'] which includes data, errors, and clientExtensions
      // The type of data is Schema[Key]['returnType'] which useDataState also wraps in a data return
      // TODO: follow up with how to type handleGenerate to properly return the promise wrapper shape
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const data = (result as any).data as Schema[Key]['returnType'];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const graphqlErrors = (result as any).errors;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment
      return { ...data, ...(graphqlErrors ? { graphqlErrors } : {}) };
    };

    return useDataState(updateAIGenerationStateAction, {});
  };

  return useAIGeneration;
}
