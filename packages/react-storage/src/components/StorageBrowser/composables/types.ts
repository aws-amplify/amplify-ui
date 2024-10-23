import { StatusDisplay } from './StatusDisplay';
import { DataRefresh } from './DataRefresh';

const composables = {
  StatusDisplay,
  DataRefresh,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
