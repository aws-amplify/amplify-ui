import * as React from 'react';
import { Sizes } from './base';
import { ElementType, PrimitivePropsWithRef, BaseViewProps } from './view';

export type TableSize = Sizes;
export type TableVariation = 'bordered' | 'striped';

export interface BaseTableProps extends BaseViewProps {
  /**
   * @description
   * Optional caption which serves as an accessible title/caption for
   * the table.
   */
  caption?: React.ReactNode;

  /**
   * @description
   * If set to true, will highlight a table row on hover. Default is false.
   */
  highlightOnHover?: boolean;

  /**
   * @description
   * Affects font size and padding. Default is in between 'small' and 'large'.
   */
  size?: TableSize;

  /**
   * @description
   * Sets a supported style variation. Default is no specific variation.
   */
  variation?: TableVariation;
}
export type TableProps<Element extends ElementType = 'table'> =
  PrimitivePropsWithRef<BaseTableProps, Element>;

export interface BaseTableBodyProps extends BaseViewProps {}
export type TableBodyProps<Element extends ElementType = 'tbody'> =
  PrimitivePropsWithRef<BaseTableBodyProps, Element>;

export type TableCellElement = 'td' | 'th';

export interface BaseTableCellProps extends BaseViewProps {
  /**
   * @description
   * Defines the number of columns spanned by a cell within a <table>
   */
  colspan?: Pick<React.HTMLProps<HTMLTableCellElement>, 'colSpan'>;

  /**
   * @description
   * Defines the number of rows spanned by a cell within a <table>
   */
  rowspan?: Pick<React.HTMLProps<HTMLTableCellElement>, 'rowSpan'>;
}
export type TableCellProps<Element extends ElementType = TableCellElement> =
  PrimitivePropsWithRef<BaseTableCellProps, Element>;

export interface BaseTableFootProps extends BaseViewProps {}
export type TableFootProps<Element extends ElementType = 'tfoot'> =
  PrimitivePropsWithRef<BaseTableFootProps, Element>;

export interface BaseTableHeadProps extends BaseViewProps {}
export type TableHeadProps<Element extends ElementType = 'thead'> =
  PrimitivePropsWithRef<BaseTableHeadProps, Element>;

export interface BaseTableRowProps extends BaseViewProps {}
export type TableRowProps<Element extends ElementType = 'tr'> =
  PrimitivePropsWithRef<BaseTableRowProps, Element>;
