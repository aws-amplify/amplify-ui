import { DataTable } from './DataTable';
import { DropZone } from './DropZone';
import { StatusDisplay } from './StatusDisplay';

const composables = {
  DataTable,
  DropZone,
  StatusDisplay,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
