import React from 'react';

import { humanFileSize, isFunction } from '@aws-amplify/ui';

import { LocationData } from '../../actions';
import { displayText } from '../../displayText/en';
import { TABLE_HEADER_BUTTON_CLASS_NAME } from '../../components/DataTable';
import { DescriptionList } from '../../components/DescriptionList';
import {
  ButtonElement,
  StorageBrowserElements,
  ViewElement,
} from '../../context/elements';
import { IconElement, IconVariant } from '../../context/elements/IconElement';
// import { getActionViewDisabledButtons, getAllTasksStatus } from '../utils';

import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { ControlsContextProvider } from '../../controls/context';
import { ControlsContext } from '../../controls/types';
import { useStore } from '../../providers/store';
import { TaskStatus } from '../../tasks';

import { compareNumbers, compareStrings, getPercentValue } from '../utils';
import { CLASS_BASE } from '../constants';
import { Controls } from '../Controls';
import {
  TableDataText,
  Column,
  RenderRowItem,
  SortState,
} from '../Controls/Table';
import { Title } from './Controls/Title';
import { STATUS_DISPLAY_VALUES } from './constants';
import { FileItems } from '../../providers/store/files';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { useUploadView } from './UploadView';
import { ActionCancelControl } from '../../controls/ActionCancelControl';

const { Icon } = StorageBrowserElements;

const { Exit, Overwrite, Table } = Controls;

interface LocationActionViewColumns {
  cancel: (() => void) | undefined;
  folder: string;
  key: string;
  progress: number;
  remove: () => void;
  size: number;
  status: TaskStatus;
  type: string;
}

interface ActionIconProps {
  status?: TaskStatus;
}

const LOCATION_ACTION_VIEW_COLUMNS: Column<LocationActionViewColumns>[] = [
  { key: 'key', header: 'Name' },
  { key: 'folder', header: 'Folder' },
  { key: 'type', header: 'Type' },
  { key: 'size', header: 'Size' },
  { key: 'status', header: 'Status' },
  { key: 'progress', header: 'Progress' },
  { key: 'cancel', header: '' },
];

export const ICON_CLASS = `${CLASS_BASE}__action-status`;

export const ActionIcon = ({ status }: ActionIconProps): React.JSX.Element => {
  let variant: IconVariant = 'action-initial';

  switch (status) {
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
      className={`${ICON_CLASS} ${ICON_CLASS}--${variant}${
        variant === 'action-progress' ? ' storage-browser__loading__icon' : ''
      }`}
    />
  );
};

const LocationActionViewColumnSortMap = {
  key: compareStrings,
  size: compareNumbers,
  status: compareStrings,
  progress: compareNumbers,
  type: compareStrings,
  folder: compareStrings,
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
      case 'key': {
        // Render the key without the parent folders
        const folder = row.key.lastIndexOf('/') + 1;

        return (
          <TableDataText>
            <ActionIcon status={row.status} />
            {row.key.slice(folder, row.key.length)}
          </TableDataText>
        );
      }
      case 'folder': {
        return <TableDataText>{row.folder}</TableDataText>;
      }
      case 'type': {
        return <TableDataText>{row.type}</TableDataText>;
      }
      case 'size':
        return <TableDataText>{humanFileSize(row.size, true)}</TableDataText>;
      case 'status':
        return (
          <TableDataText>{STATUS_DISPLAY_VALUES[row.status]}</TableDataText>
        );
      case 'progress':
        return (
          <TableDataText>{`${getPercentValue(row.progress)}%`}</TableDataText>
        );
      case 'cancel':
        if (row.cancel) {
          const BLOCK_NAME = `${CLASS_BASE}__cancel`;
          return (
            <ButtonElement
              className={`${BLOCK_NAME}`}
              variant="cancel"
              onClick={row.cancel}
              aria-label={`Cancel upload for ${row.key}`}
            >
              <IconElement className={`${BLOCK_NAME}__icon`} variant="cancel" />
            </ButtonElement>
          );
        }

        return null;
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

const getFileSelectionType = (
  actionType?: string,
  files?: FileItems
): 'FILE' | 'FOLDER' | undefined => {
  if (files?.length ?? !actionType) return undefined;

  return actionType === 'UPLOAD_FILES' ? 'FILE' : 'FOLDER';
};

export const UploadControls = ({
  onExit: _onExit,
}: {
  onExit?: (location: LocationData) => void;
}): JSX.Element => {
  const [{ actionType, files, location }, dispatchStoreAction] = useStore();
  const { current, key: destinationPrefix } = location;

  // launch native file picker on intiial render if no files are currently in state
  const selectionTypeRef = React.useRef<'FILE' | 'FOLDER' | undefined>(
    getFileSelectionType(actionType, files)
  );

  React.useEffect(() => {
    const selectionType = selectionTypeRef.current;
    if (!selectionType) {
      return;
    }

    dispatchStoreAction({ type: 'SELECT_FILES', selectionType });

    return () => {
      selectionTypeRef.current = undefined;
    };
  }, [dispatchStoreAction]);

  const {
    tasks,
    taskCounts,
    disableStart,
    disableCancel,
    isProcessing,
    isProcessingComplete,
    isOverwriteEnabled,
    onToggleOverwrite,
    onActionStart,
    onActionCancel,
    onSelectFiles,
    onExit,
    onDropFiles,
  } = useUploadView({ onExit: _onExit });

  const [compareFn, setCompareFn] = React.useState<(a: any, b: any) => number>(
    () => compareStrings
  );
  const [sortState, setSortState] = React.useState<
    SortState<LocationActionViewColumns>
  >(() => ({ selection: 'key', direction: 'ascending' }));

  const { direction, selection } = sortState;

  // const { hasStarted, hasCompleted } = getAllTasksStatus(taskCounts);
  const tableData = tasks
    .map(({ data, ...task }) => {
      const { key, id, file } = data as { key: string; id: string; file: File };
      const { size, webkitRelativePath, type = '-' } = file;
      const folder =
        webkitRelativePath?.length > 0
          ? webkitRelativePath.slice(0, webkitRelativePath.lastIndexOf('/') + 1)
          : '/';

      const remove = () => {
        dispatchStoreAction({ type: 'REMOVE_FILE_ITEM', id });
        task.remove?.();
      };
      const cancel = isProcessing ? task.cancel : remove;
      const progress = task.progress ?? 0;

      return { ...task, cancel, folder, key, progress, size, type };
    })
    .sort((a, b) =>
      direction === 'ascending'
        ? compareFn(a[selection], b[selection])
        : compareFn(b[selection], a[selection])
    );

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
            <ButtonElement
              variant="sort"
              className={TABLE_HEADER_BUTTON_CLASS_NAME}
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
            </ButtonElement>
          ) : (
            column.header
          )}
        </Table.TableHeader>
      );
    },
    [direction, selection]
  );

  // FIXME: Eventually comes from useView hook
  const contextValue: ControlsContext = {
    data: {
      taskCounts,
      isActionStartDisabled: disableStart,
      actionStartLabel: 'Start',
      actionCancelLabel: 'Cancel',
      isActionCancelDisabled: disableCancel,
    },
    actionsConfig: {
      type: 'BATCH_ACTION',
      isCancelable: true,
    },
    onActionStart,
    onActionCancel,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit
        onClick={() => {
          if (isFunction(onExit)) onExit?.(current!);
          // clear tasks state
          tasks.forEach(({ remove }) => remove?.());
          // clear files state
          dispatchStoreAction({ type: 'RESET_FILE_ITEMS' });
          // clear selected action
          dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
        }}
      />
      <Title />
      <ViewElement className={`${CLASS_BASE}__action-header`}>
        <ViewElement className={`${CLASS_BASE}__upload-destination`}>
          <DescriptionList
            descriptions={[
              {
                term: `${displayText.actionDestination}:`,
                details: destinationPrefix.length ? destinationPrefix : '/',
              },
            ]}
          />
          <Overwrite
            defaultChecked={isOverwriteEnabled}
            disabled={isProcessing || isProcessingComplete}
            handleChange={onToggleOverwrite}
          />
        </ViewElement>
        <ButtonElement
          disabled={isProcessing || isProcessingComplete}
          className={`${CLASS_BASE}__add-folder`}
          variant="add-folder"
          onClick={() => {
            onSelectFiles('FOLDER');
          }}
        >
          Add folder
        </ButtonElement>
        <ButtonElement
          disabled={isProcessing || isProcessingComplete}
          className={`${CLASS_BASE}__add-files`}
          variant="add-files"
          onClick={() => {
            onSelectFiles('FILE');
          }}
        >
          Add files
        </ButtonElement>
      </ViewElement>
      <Table
        data={tableData}
        columns={LOCATION_ACTION_VIEW_COLUMNS}
        handleDroppedFiles={(files) => onDropFiles(files)}
        renderHeaderItem={renderHeaderItem}
        renderRowItem={renderRowItem}
      />
      <ViewElement className={`${CLASS_BASE}__action-footer`}>
        <StatusDisplayControl
          className={`${CLASS_BASE}__upload-status-display`}
        />
        <ActionCancelControl className={`${CLASS_BASE}__cancel`} />
        <ActionStartControl className={`${CLASS_BASE}__upload-action-start`} />
      </ViewElement>
    </ControlsContextProvider>
  );
};
