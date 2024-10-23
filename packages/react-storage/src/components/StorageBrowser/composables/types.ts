import { ActionCancel } from './ActionCancel';
import { StatusDisplay } from './StatusDisplay';

const composables = {
  StatusDisplay,
  ActionCancel,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
