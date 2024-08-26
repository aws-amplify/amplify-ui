import React from 'react';

import { humanFileSize } from '@aws-amplify/ui';
import { useFileSelect } from '@aws-amplify/ui-react/internal';

import { StorageBrowserElements } from '../../context/elements';
import { useControl } from '../../context/controls';
import { compareNumbers, compareStrings } from '../../context/controls/Table';
import { TaskStatus } from '../../context/types';
import { IconVariant } from '../../context/elements/IconElement';

import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import {
  TableDataText,
  Column,
  RenderRowItem,
  SortState,
  TableHeaderButton,
} from '../Controls/Table';

import { Title } from './Controls/Title';
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
    case 'INITIAL':
    case 'QUEUED':
      variant = 'action-queued';
      break;
    case 'PENDING':
      variant = 'action-progress';
      break;
    case 'COMPLETE':
      variant = 'action-success';
      break;
    case 'FAILED':
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

const parseSelectionData = (
  value: string | string[] | undefined
): { type: 'file' | 'folder' | undefined; accept: string | undefined } => {
  const type =
    value?.[0] === 'file' || value === 'file'
      ? 'file'
      : value?.[0] === 'folder' || value === 'folder'
      ? 'folder'
      : undefined;

  const accept = type && Array.isArray(value) ? value[1] : undefined;

  return { type, accept };
};

export const UploadControls = (): JSX.Element => {
  const [{ history, path }] = useControl({ type: 'NAVIGATE' });
  const [files, setFiles] = React.useState<File[]>([]);
  const [fileSelect, handleSelect] = useFileSelect(setFiles);

  const [{ selected, actions }, handleUpdateState] = useControl({
    type: 'ACTION_SELECT',
  });

  const [tasks, handleUpload] = useHandleUpload({
    prefix: path,
    files,
  });

  let tableData = tasks.map((task) => ({
    ...task,
    type: task.data.type ?? '-',
  }));

  const { options } = actions[selected.type!];
  const { selectionData } = options ?? {};

  React.useEffect(() => {
    const { type, accept } = parseSelectionData(selectionData);
    if (type) {
      handleSelect(type, { accept });
    }
  }, [handleSelect, selectionData]);

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

  return (
    <>
      {fileSelect}
      <Title />
      <Exit onClick={() => handleUpdateState({ type: 'CLEAR' })} />
      <Primary
        disabled={tasks.some((task) => task.status === 'PENDING')}
        onClick={() => {
          handleUpload();
        }}
      >
        Start
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
  );
};
