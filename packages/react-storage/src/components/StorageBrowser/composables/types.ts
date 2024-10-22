import { ActionStart } from './ActionStart';
import { StatusDisplay } from './StatusDisplay';

const composables = {
  StatusDisplay,
  ActionStart,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
