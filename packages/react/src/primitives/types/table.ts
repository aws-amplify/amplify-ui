import * as React from 'react';
import { Sizes } from './base';
import { ViewProps } from './view';

export type TableSize = Sizes;
export type TableVariation = 'bordered' | 'striped';

export interface TableProps extends ViewProps {
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

export interface TableBodyProps extends ViewProps {}

export type TableCellElement = 'td' | 'th';

export interface TableCellProps extends ViewProps {
  as?: TableCellElement;

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

export interface TableFootProps extends ViewProps {}

export interface TableHeadProps extends ViewProps {}

export interface TableRowProps extends ViewProps {}
