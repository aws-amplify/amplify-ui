import React from 'react';
import type {
  DataTableButtonDataCell,
  DataTableDateDataCell,
  DataTableTextDataCell,
  DataTableDataCell,
  DataTableProps,
  SortDirection,
  DataTableNumberDataCell,
} from '../../components';
import { useControlsContext } from '../context';
import { compareButtonData } from './compareFunctions/compareButtonData';
import { compareDateData } from './compareFunctions/compareDateData';
import { compareNumberData } from './compareFunctions/compareNumberData';
import { compareTextData } from './compareFunctions/compareTextData';

interface SortState {
  index: number;
  direction: SortDirection;
}

type GroupedRows = {
  [K in DataTableDataCell['type']]: DataTableProps['rows'];
};

const GROUP_ORDER: DataTableDataCell['type'][] = [
  'checkbox',
  'button',
  'date',
  'number',
  'text',
];

const UNSORTABLE_GROUPS: DataTableDataCell['type'][] = ['checkbox'];

export const useDataTable = (): DataTableProps => {
  const { data } = useControlsContext();
  const { isLoading, tableData } = data;

  const defaultSortIndex = React.useMemo(
    () => tableData?.headers?.findIndex(({ type }) => type === 'sort') ?? -1,
    [tableData]
  );

  const [sortState, setSortState] = React.useState<SortState>({
    index: defaultSortIndex,
    direction: 'ascending',
  });

  const mappedHeaders = React.useMemo(
    () =>
      tableData?.headers.map((header, index) => {
        const { type } = header;
        switch (type) {
          case 'sort': {
            return {
              ...header,
              content: {
                ...header.content,
                onSort: () => {
                  setSortState({
                    index,
                    direction:
                      sortState.index === index
                        ? sortState.direction === 'ascending'
                          ? 'descending'
                          : 'ascending'
                        : 'ascending',
                  });
                },
                sortDirection:
                  sortState.index === index ? sortState.direction : undefined,
              },
            };
          }
          case 'checkbox':
          case 'text':
          default: {
            return header;
          }
        }
      }),
    [sortState, tableData]
  );

  const sortedRows = React.useMemo(() => {
    // Early return if there is no table data
    if (!tableData) {
      return;
    }
    // Return rows as is if there are no sortable columns
    if (sortState.index < 0) {
      return tableData.rows;
    }

    const { index, direction } = sortState;
    const groupedRows: GroupedRows = {
      button: [],
      checkbox: [],
      date: [],
      number: [],
      text: [],
    };

    tableData.rows.forEach((row) => {
      const { type } = row.content[index];
      groupedRows[type].push(row);
    });

    const groupOrder =
      direction === 'ascending' ? GROUP_ORDER : [...GROUP_ORDER].reverse();

    return groupOrder
      .map((groupType) => {
        if (UNSORTABLE_GROUPS.includes(groupType)) {
          return groupedRows[groupType];
        }
        return groupedRows[groupType].sort((rowA, rowB) => {
          switch (groupType) {
            case 'button': {
              return compareButtonData(
                rowA.content[index] as DataTableButtonDataCell,
                rowB.content[index] as DataTableButtonDataCell,
                direction
              );
            }
            case 'date': {
              return compareDateData(
                rowA.content[index] as DataTableDateDataCell,
                rowB.content[index] as DataTableDateDataCell,
                direction
              );
            }
            case 'number': {
              return compareNumberData(
                rowA.content[index] as DataTableNumberDataCell,
                rowB.content[index] as DataTableNumberDataCell,
                direction
              );
            }
            case 'text':
            default: {
              return compareTextData(
                rowA.content[index] as DataTableTextDataCell,
                rowB.content[index] as DataTableTextDataCell,
                direction
              );
            }
          }
        });
      })
      .flat();
  }, [sortState, tableData]);

  return {
    headers: mappedHeaders ?? [],
    isLoading,
    rows: sortedRows ?? [],
  };
};
