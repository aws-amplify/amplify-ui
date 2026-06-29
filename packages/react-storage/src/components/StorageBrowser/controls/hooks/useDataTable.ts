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
import type { HeaderKeys } from '../../views/LocationDetailView/getLocationDetailViewTableData/types';
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
  const { data, onSort: onCrossPageSort } = useControlsContext();
  const { isLoading, tableData, sortState: crossPageSortState } = data;

  const hasCrossPageSort = !!onCrossPageSort;

  const defaultSortIndex = React.useMemo(
    () => tableData?.headers?.findIndex(({ type }) => type === 'sort') ?? -1,
    [tableData]
  );

  const [localSortState, setLocalSortState] = React.useState<SortState>({
    index: defaultSortIndex,
    direction: 'ascending',
  });

  const sortState = localSortState;

  const mappedHeaders = React.useMemo(
    () =>
      tableData?.headers.map((header, index) => {
        const { type } = header;
        switch (type) {
          case 'sort': {
            const headerKey = (header as { key?: HeaderKeys }).key;

            if (hasCrossPageSort && headerKey) {
              const isActive = crossPageSortState?.field === headerKey;
              return {
                ...header,
                content: {
                  ...header.content,
                  onSort: () => {
                    onCrossPageSort(headerKey);
                  },
                  sortDirection: isActive
                    ? crossPageSortState.direction
                    : undefined,
                },
              };
            }

            return {
              ...header,
              content: {
                ...header.content,
                onSort: () => {
                  setLocalSortState({
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
    [
      crossPageSortState,
      hasCrossPageSort,
      onCrossPageSort,
      sortState,
      tableData,
    ]
  );

  const sortedRows = React.useMemo(() => {
    if (!tableData) {
      return;
    }

    // When cross-page sort is active, rows are already sorted upstream
    if (hasCrossPageSort) {
      return tableData.rows;
    }

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
  }, [hasCrossPageSort, sortState, tableData]);

  return {
    headers: mappedHeaders ?? [],
    isLoading,
    rows: sortedRows ?? [],
  };
};
