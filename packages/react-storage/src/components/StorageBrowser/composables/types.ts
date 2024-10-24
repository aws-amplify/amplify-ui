import { DataTable } from './DataTable';
import { StatusDisplay } from './StatusDisplay';
import { Title } from './Title';

const composables = {
  DataTable,
  StatusDisplay,
  Title,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
