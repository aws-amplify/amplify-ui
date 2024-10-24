import { DataTable } from './DataTable';
import { Pagination } from './Pagination';
import { StatusDisplay } from './StatusDisplay';

const composables = {
  DataTable,
  StatusDisplay,
  Pagination,
};

export type ComposableTypes = typeof composables;

export interface Composables {
  composables?: ComposableTypes;
}
