import { ActionCancel } from './ActionCancel';
import { DataTable } from './DataTable';
import { StatusDisplay } from './StatusDisplay';

const composables = {
  DataTable,
  StatusDisplay,
  ActionCancel,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
