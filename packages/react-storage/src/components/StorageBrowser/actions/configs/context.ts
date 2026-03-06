import { createContextUtilities } from '@aws-amplify/ui-react-core';
import type { ActionViewConfigs } from './types';

export interface ActionConfigsProviderProps {
  actionConfigs: ActionViewConfigs;
  children?: React.ReactNode;
}

const defaultValue: { actionConfigs: ActionViewConfigs | undefined } = {
  actionConfigs: undefined,
};

export const { useActionConfigs, ActionConfigsProvider } =
  createContextUtilities({ contextName: 'ActionConfigs', defaultValue });
