import * as React from 'react';
import type { ClientExtensions } from '@aws-amplify/data-schema/runtime';
import { getSchema } from '../types';
import {
  DataClientResponse,
  DataClientState,
  ERROR_STATE,
  INITIAL_STATE,
  LOADING_STATE,
} from './shared';

export interface UseAIGenerationHookWrapper<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> {
  useAIGeneration: <U extends Key>(
    routeName: U
  ) => [
    Awaited<DataClientState<Schema[U]['returnType']>>,
    (input: Schema[U]['args']) => void,
  ];
}

export type UseAIGenerationHook<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> = (
  routeName: Key
) => [
  Awaited<DataClientState<Schema[Key]['returnType']>>,
  (input: Schema[Key]['args']) => void,
];

type AIGenerationClient<T extends Record<any, any>> = Pick<
  ClientExtensions<T>,
  'generations'
>;

export function createUseAIGeneration<
  Client extends Record<'generations' | 'conversations', Record<string, any>>,
  Schema extends getSchema<Client>,
>(client: Client): UseAIGenerationHook<keyof Client['generations'], Client> {
  const useAIGeneration = <
    Key extends keyof AIGenerationClient<Schema>['generations'],
  >(
    routeName: Key
  ): [
    state: DataClientState<Schema[Key]['returnType']>,
    handleAction: (input: Schema[Key]['args']) => Promise<void>,
  ] => {
    const [dataState, setDataState] = React.useState<
      DataClientState<Schema[Key]['returnType']>
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

        const { data, errors } = result as DataClientResponse<
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
