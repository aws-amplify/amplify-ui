import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { Composables } from './types';

const defaultValue: Composables = {};

export const { useComposables, ComposablesProvider } = createContextUtilities({
  contextName: 'Composables',
  defaultValue,
});
