import { DataTable } from './DataTable';
import { StatusDisplay } from './StatusDisplay';
import { DataRefresh } from './DataRefresh';

const composables = {
  DataTable,
  StatusDisplay,
  DataRefresh,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
