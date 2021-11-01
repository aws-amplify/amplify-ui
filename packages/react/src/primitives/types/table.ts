import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

export interface TableProps extends BaseComponentProps, BaseStyleProps {
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
   * Will be set as the table's accessible aria-label
   */
  label?: string;

  /**
   * Affects font size and padding. Default is in between 'small' and 'large'.
   */
  size?: 'small' | 'large';

  /**
   * Optional summary that is rendered as part of the table caption.
   */
  summary?: string;

  /**
   * Sets a supported style variation. Default is no specific variation.
   */
  variation?: 'bordered' | 'striped';
}

export interface TableBodyProps extends BaseComponentProps, BaseStyleProps {}

export interface TableCellProps extends BaseComponentProps, BaseStyleProps {
  as?: 'td' | 'th';
}

export interface TableFootProps extends BaseComponentProps, BaseStyleProps {}

export interface TableHeadProps extends BaseComponentProps, BaseStyleProps {}

export interface TableRowProps extends BaseComponentProps, BaseStyleProps {}
