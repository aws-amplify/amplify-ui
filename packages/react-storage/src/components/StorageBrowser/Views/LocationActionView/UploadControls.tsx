import React from 'react';

import { useControl } from '../../context/controls';
import { FileItem, TaskStatus } from '../../context/types';
import { StorageBrowserElements } from '../../context/elements';
import { IconVariant } from '../../context/elements/IconElement';
import { Controls } from '../Controls';
import { Title } from './Controls';
import {
  TableDataText,
  Column,
  RenderRowItem,
  SortState,
  TableHeaderButton,
} from '../Controls/Table';
import { compareNumbers, compareStrings } from '../../context/controls/Table';
import { CLASS_BASE } from '../constants';
import { humanFileSize } from '@aws-amplify/ui';

import { CancelableTask, useHandleUpload } from './useHandleUpload';

const { Icon, DefinitionDetail, DefinitionList, DefinitionTerm } =
  StorageBrowserElements;

const { Cancel, Exit, Primary, Summary, Table } = Controls;

interface LocationActionViewColumns extends CancelableTask {
  type: string;
}

const LOCATION_ACTION_VIEW_COLUMNS: Column<LocationActionViewColumns>[] = [
  {
    key: 'key',
    header: 'Name',
  },
  {
    key: 'type',
    header: 'Type',
  },
  {
    key: 'size',
    header: 'Size',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'progress',
    header: 'Progress',
  },
  {
    key: 'cancel',
    header: 'Cancel',
  },
];

interface ActionIconProps {
  status?: TaskStatus | 'CANCELED';
}

export const ICON_CLASS = `${CLASS_BASE}__action-status`;
const DESTINATION_CLASS = `${CLASS_BASE}__destination`;

export const ActionIcon = ({ status }: ActionIconProps): React.JSX.Element => {
  let variant: IconVariant = 'action-initial';

  switch (status) {
    case 'QUEUED':
      variant = 'action-queued';
      break;
    case 'IN_PROGRESS':
      variant = 'action-progress';
      break;
    case 'SUCCESS':
      variant = 'action-success';
      break;
    case 'ERROR':
      variant = 'action-error';
      break;
    case 'CANCELED':
      variant = 'action-canceled';
      break;
  }

  return (
    <Icon
      variant={variant}
      className={`${ICON_CLASS} ${ICON_CLASS}--${variant}`}
    />
  );
};

const Destination = ({ children }: { children?: React.ReactNode }) => {
  return (
    <DefinitionList className={DESTINATION_CLASS}>
      <DefinitionTerm className={`${DESTINATION_CLASS}__term`}>
        Destination:
      </DefinitionTerm>
      <DefinitionDetail className={`${DESTINATION_CLASS}__detail`}>
        {children}
      </DefinitionDetail>
    </DefinitionList>
  );
};

const LocationActionViewColumnSortMap = {
  key: compareStrings,
  size: compareNumbers,
  status: compareStrings,
  progress: compareNumbers,
  type: compareStrings,
};

const renderRowItem: RenderRowItem<LocationActionViewColumns> = (
  row,
  index
) => {
  const renderTableData = (
    columnKey: keyof LocationActionViewColumns,
    row: LocationActionViewColumns
  ) => {
    switch (columnKey) {
      case 'key':
        return (
          <TableDataText>
            <ActionIcon status={row.status} />
            {row.key}
          </TableDataText>
        );
      case 'type': {
        return <TableDataText>{row.type}</TableDataText>;
      }
      case 'size':
        return <TableDataText>{humanFileSize(row.size, true)}</TableDataText>;
      case 'status':
        return <TableDataText>{row.status}</TableDataText>;
      case 'progress':
        return <TableDataText>{row.progress}</TableDataText>;
      case 'cancel':
        return (
          <Cancel
            onClick={row.cancel}
            ariaLabel={`Cancel upload for ${row.key}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Table.TableRow key={index}>
      {LOCATION_ACTION_VIEW_COLUMNS.map((column) => {
        return (
          <Table.TableData
            key={`${index}-${column.header}`}
            variant={column.key}
          >
            {renderTableData(column.key, row)}
          </Table.TableData>
        );
      })}
    </Table.TableRow>
  );
};

export const UploadControls = (): JSX.Element => {
  const [state, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });
  const [{ path, history }] = useControl({ type: 'NAVIGATE' });
  const { items } = state.selected;

  const [tasks, handleUpload] = useHandleUpload({
    prefix: path,
    items: items! as FileItem[],
  });

  let tableData = tasks.map((task) => ({
    ...task,
    type: task.data.type ?? '-',
  }));

  const [compareFn, setCompareFn] = React.useState<(a: any, b: any) => number>(
    () => compareStrings
  );
  const [sortState, setSortState] = React.useState<
    SortState<LocationActionViewColumns>
  >({
    selection: 'key',
    direction: 'ascending',
  });

  const { direction, selection } = sortState;

  tableData =
    direction === 'ascending'
      ? tableData.sort((a, b) => compareFn(a[selection], b[selection]))
      : tableData.sort((a, b) => compareFn(b[selection], a[selection]));

  const renderHeaderItem = React.useCallback(
    (column: Column<LocationActionViewColumns>) => {
      // Defining this function inside the `UploadControls` to get access
      // to the current sort state
      const { header, key } = column;

      return (
        <Table.TableHeader
          key={header}
          variant={key}
          aria-sort={selection === key ? direction : 'none'}
        >
          {key in LocationActionViewColumnSortMap ? (
            <TableHeaderButton
              onClick={() => {
                setCompareFn(
                  () =>
                    LocationActionViewColumnSortMap[
                      key as keyof typeof LocationActionViewColumnSortMap
                    ]
                );

                setSortState((prevState) => ({
                  selection: column.key,
                  direction:
                    prevState.direction === 'ascending'
                      ? 'descending'
                      : 'ascending',
                }));
              }}
            >
              {column.header}
              {selection === column.key ? (
                <Icon
                  variant={
                    direction === 'none'
                      ? 'sort-indeterminate'
                      : `sort-${direction}`
                  }
                />
              ) : (
                <Icon variant="sort-indeterminate" />
              )}
            </TableHeaderButton>
          ) : (
            column.header
          )}
        </Table.TableHeader>
      );
    },
    [direction, selection]
  );

  return items && items.length > 0 ? (
    <>
      <Title />
      <Exit onClick={() => handleUpdateState({ type: 'EXIT' })} />
      <Primary
        onClick={() => {
          if (!items) return;
          handleUpload();
        }}
      >
        Start upload
      </Primary>
      <Destination>{history[history.length - 1].prefix}</Destination>
      <Summary />
      <Table
        data={tableData}
        columns={LOCATION_ACTION_VIEW_COLUMNS}
        renderHeaderItem={renderHeaderItem}
        renderRowItem={renderRowItem}
      />
    </>
  ) : (
    <span>No items selected.</span>
  );
};
