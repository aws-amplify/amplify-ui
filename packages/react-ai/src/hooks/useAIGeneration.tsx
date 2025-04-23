import * as React from 'react';
import type { ClientExtensions } from '@aws-amplify/data-schema/runtime';
import type { getSchema } from '../types';
import type { AiClientResponse, AiClientState } from './shared';
import { ERROR_STATE, INITIAL_STATE, LOADING_STATE } from './shared';

export interface UseAIGenerationHookWrapper<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> {
  useAIGeneration: <U extends Key>(
    routeName: U
  ) => [
    Awaited<AiClientState<Schema[U]['returnType']>>,
    (input: Schema[U]['args']) => void,
  ];
}

export type UseAIGenerationHook<
  Key extends keyof AIGenerationClient<Schema>['generations'],
  Schema extends Record<any, any>,
> = (
  routeName: Key
) => [
  Awaited<AiClientState<Schema[Key]['returnType']>>,
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
    state: AiClientState<Schema[Key]['returnType']>,
    handleAction: (input: Schema[Key]['args']) => Promise<void>,
  ] => {
    const [clientState, setClientState] = React.useState<
      AiClientState<Schema[Key]['returnType']>
    >(() => ({ ...INITIAL_STATE, data: undefined }));

    const handleGeneration = React.useCallback(
      async (input: Schema[Key]['args']) => {
        setClientState(({ data }) => ({ ...LOADING_STATE, data }));

        const result = await (
          client.generations as AIGenerationClient<Schema>['generations']
        )[routeName](input);

        const { data, errors } = result as AiClientResponse<
          Schema[Key]['returnType']
        >;

        if (errors) {
          setClientState({ ...ERROR_STATE, data, messages: errors });
        } else {
          setClientState({ ...INITIAL_STATE, data });
        }
      },
      [routeName]
    );

    return [clientState, handleGeneration];
  };

  return useAIGeneration;
}
