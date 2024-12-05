import { createContextUtilities } from '@aws-amplify/ui-react-core';
import { ComposablesContext } from './types';

const defaultValue: ComposablesContext = {};

export const { useComposables, ComposablesProvider } = createContextUtilities({
  contextName: 'Composables',
  defaultValue,
});
