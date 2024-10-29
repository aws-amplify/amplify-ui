import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { ActionConfigs } from './types';

export interface ActionConfigsProviderProps {
  actions?: ActionConfigs;
  children?: React.ReactNode;
}

const defaultValue: { actions?: ActionConfigs } = { actions: undefined };
export const { useActionConfigs, ActionConfigsProvider } =
  createContextUtilities({ contextName: 'ActionConfigs', defaultValue });
