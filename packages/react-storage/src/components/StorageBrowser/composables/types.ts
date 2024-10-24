import { ActionStart } from './ActionStart';
import { DataTable } from './DataTable';
import { StatusDisplay } from './StatusDisplay';

const composables = {
  DataTable,
  StatusDisplay,
  ActionStart,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
