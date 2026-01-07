import type { WithKey } from '../../../components/types';
import type { DataTableHeader, DataTableDataCell } from '../../../components';

interface ResolverProps<P> {
  /**
   * additional props provided from consumer
   */
  props: P;
}

type ResolveData<TData, TDataCell> = (data: TData) => WithKey<TDataCell>;

export interface CellData<TProps, TItem> extends ResolverProps<TProps> {
  /**
   * cell item
   */
  item: TItem;
}

export type GetCell<K, TProps, TItem> = ResolveData<
  WithKey<CellData<TProps, TItem>, K>,
  DataTableDataCell
>;

export interface HeaderData<TProps> extends ResolverProps<TProps> {}

export type GetHeader<K, TProps> = ResolveData<
  WithKey<HeaderData<TProps>, K>,
  DataTableHeader
>;

export type GetRowKey<TProps, TItem> = (
  data: CellData<TProps, TItem>
) => string;

export interface DataTableResolvers<K, TProps, TItem> {
  getCell: GetCell<K, TProps, TItem>;
  getHeader: GetHeader<K, TProps>;
  getRowKey: GetRowKey<TProps, TItem>;
}
