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
    const handleGenerate = (
      client.generations as AIGenerationClient<Schema>['generations']
    )[routeName];

    const updateAIGenerationStateAction = async (
      _prev: Schema[Key]['returnType'],
      input: Schema[Key]['args']
    ): Promise<Schema[Key]['returnType']> => {
      return await handleGenerate(input);
    };

    const [result, handler] = useDataState(
      updateAIGenerationStateAction,
      undefined
    );

    let { hasError, message } = result;

    const { data, errors } =
      (result?.data as SingularReturnValue<Schema[Key]['returnType']>) ?? {};

    if (errors) {
      hasError = true;
      message = errors.map((error) => error.message).join(' ');
    }

    return [{ ...result, data, hasError, message }, handler];
  };

  return useAIGeneration;
}
