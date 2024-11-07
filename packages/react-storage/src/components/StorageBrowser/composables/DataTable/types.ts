import { CheckboxHeaderProps } from './headers/CheckboxHeader';
import { SortHeaderProps } from './headers/SortHeader';
import { TextHeaderProps } from './headers/TextHeader';
import { ButtonDataCellProps } from './dataCells/ButtonDataCell';
import { CheckboxDataCellProps } from './dataCells/CheckboxDataCell';
import { DateDataCellProps } from './dataCells/DateDataCell';
import { NumberDataCellProps } from './dataCells/NumberDataCell';
import { TextDataCellProps } from './dataCells/TextDataCell';
import { WithKey } from '../../components/types';

export interface DataTableCheckboxHeader extends WithKey<CheckboxHeaderProps> {
  type: 'checkbox';
}

export interface DataTableSortHeader extends WithKey<SortHeaderProps> {
  type: 'sort';
}

export interface DataTableTextHeader extends WithKey<TextHeaderProps> {
  type: 'text';
}

export type DataTableHeader =
  | DataTableCheckboxHeader
  | DataTableSortHeader
  | DataTableTextHeader;

export interface DataTableButtonDataCell extends WithKey<ButtonDataCellProps> {
  type: 'button';
}

export interface DataTableCheckboxDataCell
  extends WithKey<CheckboxDataCellProps> {
  type: 'checkbox';
}

export interface DataTableDateDataCell extends WithKey<DateDataCellProps> {
  type: 'date';
}

export interface DataTableNumberDataCell extends WithKey<NumberDataCellProps> {
  type: 'number';
}

export interface DataTableTextDataCell extends WithKey<TextDataCellProps> {
  type: 'text';
}

export type DataTableDataCell =
  | DataTableButtonDataCell
  | DataTableDateDataCell
  | DataTableNumberDataCell
  | DataTableCheckboxDataCell
  | DataTableTextDataCell;

export type SortDirection = 'ascending' | 'descending';
