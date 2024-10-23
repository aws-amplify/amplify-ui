import { DataTable } from './DataTable';
import { StatusDisplay } from './StatusDisplay';

const composables = {
  DataTable,
  StatusDisplay,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
