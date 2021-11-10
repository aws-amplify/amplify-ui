import { Sizes } from './base';
import { ViewProps } from './view';

export type TableSize = Sizes;
export type TableVariation = 'bordered' | 'striped';

export interface TableProps extends ViewProps {
  /**
   * Optional caption which serves as an accessible title/caption for
   * the table.
   */
  caption?: string;

  /**
   * If set to true, will highlight a table row on hover. Default is false.
   */
  highlightOnHover?: boolean;

  /**
   * Affects font size and padding. Default is in between 'small' and 'large'.
   */
  size?: TableSize;

  /**
   * Optional summary that is rendered as part of the table caption.
   */
  summary?: string;

  /**
   * Sets a supported style variation. Default is no specific variation.
   */
  variation?: TableVariation;
}

export interface TableBodyProps extends ViewProps {}

export type TableCellElement = 'td' | 'th';
export interface TableCellProps extends ViewProps {
  as?: TableCellElement;
}

export interface TableFootProps extends ViewProps {}

export interface TableHeadProps extends ViewProps {}

export interface TableRowProps extends ViewProps {}
