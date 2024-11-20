import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { ActionConfigs } from './types';

export interface ActionConfigsProviderProps {
  actions?: ActionConfigs;
  children?: React.ReactNode;
}

const defaultValue: { actions?: ActionConfigs } = { actions: undefined };
export const { useActionConfigs, ActionConfigsProvider } =
  createContextUtilities({ contextName: 'ActionConfigs', defaultValue });

export function useActionConfig<T extends keyof ActionConfigs>(
  type?: T
): ActionConfigs[T] {
  const { actions } = useActionConfigs();

  const config = type && actions?.[type];

  if (!config) throw new Error('No action!');

  return config;
}
