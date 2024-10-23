import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { ActionConfigs } from './types';

export interface ActionConfigsProviderProps {
  actions?: ActionConfigs;
}

const defaultValue: ActionConfigs = {};

export const { useActionConfigs, ActionConfigsProvider } =
  createContextUtilities({ contextName: 'ActionConfigs', defaultValue });
