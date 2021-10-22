import React from 'react';
import { BaseComponentProps } from './base';
import { BaseStyleProps } from './style';

export interface TableProps extends BaseComponentProps, BaseStyleProps {
  /**
   * Optional caption which serves as an accessible title/caption for
   * the table.
   */
  caption?: string;

  /**
   * Used to provide an accessible name to the Table component.
   */
  name?: string;

  /**
   * Optional summary that is rendered as part of the table caption.
   */
  summary?: string;
}

export interface TableBodyProps extends BaseComponentProps, BaseStyleProps {}

export interface TableCellProps extends BaseComponentProps, BaseStyleProps {
  as?: 'td' | 'th';
}

export interface TableHeadProps extends BaseComponentProps, BaseStyleProps {}

export interface TableRowProps extends BaseComponentProps, BaseStyleProps {}

export type TableControls = React.FC<TableProps> & {
  Body: React.FC<TableBodyProps>;
  Cell: React.FC<TableCellProps>;
  Head: React.FC<TableHeadProps>;
  Row: React.FC<TableRowProps>;
};
