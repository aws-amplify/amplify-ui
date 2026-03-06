import type { CheckboxHeaderProps } from './headers/CheckboxHeader';
import type { SortHeaderProps } from './headers/SortHeader';
import type { TextHeaderProps } from './headers/TextHeader';
import type { ButtonDataCellProps } from './dataCells/ButtonDataCell';
import type { CheckboxDataCellProps } from './dataCells/CheckboxDataCell';
import type { DateDataCellProps } from './dataCells/DateDataCell';
import type { NumberDataCellProps } from './dataCells/NumberDataCell';
import type { TextDataCellProps } from './dataCells/TextDataCell';

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
