import { CheckboxHeaderProps } from './headers/CheckboxHeader';
import { SortHeaderProps } from './headers/SortHeader';
import { TextHeaderProps } from './headers/TextHeader';
import { ButtonDataCellProps } from './dataCells/ButtonDataCell';
import { CheckboxDataCellProps } from './dataCells/CheckboxDataCell';
import { DateDataCellProps } from './dataCells/DateDataCell';
import { NumberDataCellProps } from './dataCells/NumberDataCell';
import { TextDataCellProps } from './dataCells/TextDataCell';

export interface DataTableCheckboxHeader extends CheckboxHeaderProps {
  type: 'checkbox';
}

export interface DataTableSortHeader extends SortHeaderProps {
  type: 'sort';
}

export interface DataTableTextHeader extends TextHeaderProps {
  type: 'text';
}

export type DataTableHeader =
  | DataTableCheckboxHeader
  | DataTableSortHeader
  | DataTableTextHeader;

export interface DataTableButtonDataCell extends ButtonDataCellProps {
  type: 'button';
}

export interface DataTableCheckboxDataCell extends CheckboxDataCellProps {
  type: 'checkbox';
}

export interface DataTableDateDataCell extends DateDataCellProps {
  type: 'date';
}

export interface DataTableNumberDataCell extends NumberDataCellProps {
  type: 'number';
}

export interface DataTableTextDataCell extends TextDataCellProps {
  type: 'text';
}

export type DataTableDataCell =
  | DataTableButtonDataCell
  | DataTableDateDataCell
  | DataTableNumberDataCell
  | DataTableCheckboxDataCell
  | DataTableTextDataCell;

export type SortDirection = 'ascending' | 'descending';
