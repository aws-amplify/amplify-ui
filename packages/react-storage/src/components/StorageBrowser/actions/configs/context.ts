import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { ActionConfigs } from './types';

const defaultValue: ActionConfigs = {};

export const { useActionConfigs, ActionConfigsProvider } =
  createContextUtilities({ contextName: 'ActionConfigs', defaultValue });
