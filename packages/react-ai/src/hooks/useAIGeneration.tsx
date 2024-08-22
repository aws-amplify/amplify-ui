import { DataState, useDataState } from '@aws-amplify/ui-react-core';
import { V6Client as SDKV6Client } from '@aws-amplify/api-graphql';
import { getSchema } from '../types';

interface UseAIGenerationInput {
  onError?: (error: Error) => void;
}

export interface UseAIGenerationHookWrapper<
  Key extends keyof V6Client<Schema>['generations'],
  Schema extends Record<any, any>,
> {
  useAIGeneration: <U extends Key>(
    routeName: U,
    input?: UseAIGenerationInput
  ) => [
    Awaited<DataState<Schema[U]['returnType']>>,
    (input: Schema[U]['args']) => void,
  ];
}

export type UseAIGenerationHook<
  Key extends keyof V6Client<Schema>['generations'],
  Schema extends Record<any, any>,
> = (
  routeName: Key,
  input?: UseAIGenerationInput
) => [
  Awaited<DataState<Schema[Key]['returnType']>>,
  (input: Schema[Key]['args']) => void,
];

type V6Client<T extends Record<any, any>> = Pick<SDKV6Client<T>, 'generations'>;

export function createUseAIGeneration<
  Client extends Record<'generations' | 'conversations', Record<string, any>>,
  Schema extends getSchema<Client>,
>(client: Client): UseAIGenerationHook<keyof Client['generations'], Client> {
  const useAIGeneration = <Key extends keyof V6Client<Schema>['generations']>(
    routeName: Key,
    _input?: UseAIGenerationInput
  ) => {
    const handleGenerate = (
      client.generations as V6Client<Schema>['generations']
    )[routeName];

    const updateAIGenerationStateAction = async (
      _prev: Schema[Key]['returnType'],
      input: Schema[Key]['args']
    ): Promise<Schema[Key]['returnType']> => {
      const result = await handleGenerate(input);

      return { ...result };
    };

    return useDataState(updateAIGenerationStateAction, {});
  };

  return useAIGeneration;
}
