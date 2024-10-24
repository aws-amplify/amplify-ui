import { useMemo } from 'react';

import { humanFileSize, isFunction } from '@aws-amplify/ui';

import { useGetLocationConfig } from '../../../context/config';
import { useControl } from '../../../context/control';
import { DataTableProps } from '../../../composables/DataTable';
import { deleteHandler } from '../../../actions/handlers';
import { Task, useProcessTasks } from '../../../tasks';
import { UseActionView } from './types';
import { ControlsContext } from '../../../controls/types';
import { WithKey } from '../../../components/types';
import { DataTableRow } from '../../../composables/DataTable/DataTable';
import { STATUS_DISPLAY_VALUES } from '../../LocationActionView/constants';
import { LocationItem } from '../../../context/types';
import {
  getActionIconVariant,
  getActionViewTaskStatuses,
  getFilenameWithoutPrefix,
  getFileTypeDisplayValue,
} from './utils';

interface UseDeleteActionView extends UseActionView {}

const LOCATION_ACTION_VIEW_HEADERS: DataTableProps['headers'] = [
  { key: 'key', type: 'sort', content: { label: 'Name' } },
  { key: 'folder', type: 'text', content: { text: 'Folder' } },
  { key: 'type', type: 'text', content: { text: 'Type' } },
  { key: 'size', type: 'text', content: { text: 'Size' } },
  { key: 'status', type: 'sort', content: { label: 'Status' } },
  { key: 'action', type: 'text', content: { text: '' } },
  // { key: 'progress', header: 'Progress' },
];

export const getDeleteActionViewTableData = ({
  tasks,
  path,
}: {
  tasks: Task[];
  path: string;
}): DataTableProps => {
  const { taskCounts, hasStarted } = getActionViewTaskStatuses(tasks);

  const rows: DataTableProps['rows'] = tasks.map((item) => {
    const row: WithKey<DataTableRow> = {
      key: item.key,
      content: LOCATION_ACTION_VIEW_HEADERS.map(({ key: columnKey }) => {
        const key = `${columnKey}-${item.key}`;
        switch (columnKey) {
          case 'key': {
            return {
              key,
              type: 'text',
              content: {
                icon: getActionIconVariant(item.status),
                text: getFilenameWithoutPrefix(item.key),
              },
            };
          }
          case 'folder': {
            return {
              key,
              type: 'text',
              content: {
                text: path,
              },
            };
          }
          case 'type': {
            return {
              key,
              type: 'text',
              content: {
                text: getFileTypeDisplayValue(item.key),
              },
            };
          }
          case 'size':
            return {
              key,
              type: 'text',
              content: {
                text: humanFileSize(
                  parseInt((item as Task & { size: string }).size),
                  true
                ),
              },
            };
          case 'status':
            return {
              key,
              type: 'text',
              content: {
                text: STATUS_DISPLAY_VALUES[item.status],
              },
            };
          case 'action':
            // don't allow removing a single task
            if (taskCounts.TOTAL > 1) {
              return hasStarted
                ? {
                    key,
                    type: 'button',
                    content: {
                      icon: 'cancel',
                      ariaLabel: `Cancel item: ${item.key}`,
                      onClick: () => item.cancel?.(),
                    },
                  }
                : {
                    key,
                    type: 'button',
                    content: {
                      icon: 'cancel',
                      ariaLabel: `Remove item: ${item.key}`,
                      onClick: () => item.remove(),
                    },
                  };
            } else {
              return {
                key,
                type: 'text',
                content: {
                  text: '',
                },
              };
            }
          default:
            return {
              key,
              type: 'text',
              content: {
                text: '',
              },
            };

            {
              /*
          // case 'progress':
          //   return (
          //     <TableDataText>{`${getPercentValue(item.progress)}%`}</TableDataText>
          //   );
  
            return null; */
            }
        }
      }),
    };
    return row;
  });

  const tableData: DataTableProps = {
    headers: LOCATION_ACTION_VIEW_HEADERS,
    rows,
  };
  return tableData;
};

export const UseDeleteActionView = (): UseDeleteActionView => {
  const getConfig = useGetLocationConfig();
  const { bucket, credentialsProvider, region, accountId } = getConfig();

  const [{ path }] = useControl('NAVIGATE');
  const [, handleUpdateState] = useControl('LOCATION_ACTIONS');
  const [
    {
      selected: { items: selected = [] },
    },
  ] = useControl('LOCATION_ACTIONS');

  const processTasksInputItems: (LocationItem & { item: unknown })[] =
    useMemo(() => {
      return selected
        ? selected.map((item) => ({
            ...item,
            key: item.key,
            item: undefined,
          }))
        : [];
    }, [selected]);

  const [tasks, processTasks] = useProcessTasks(
    deleteHandler,
    processTasksInputItems
  );

  const { disableCancel, disableClose, disablePrimary, taskCounts } =
    getActionViewTaskStatuses(tasks);
  const tableData = getDeleteActionViewTableData({ tasks, path: path ?? '' });

  const contextValue: ControlsContext = {
    data: { taskCounts, tableData },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
  };

  const onStart = () => {
    processTasks({
      prefix: path ?? '',
      config: {
        accountId,
        bucket,
        credentials: credentialsProvider,
        region,
      },
    });
  };

  const onCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, cancel doesn't currently cancel the tasks
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onClose = () => {
    handleUpdateState({ type: 'CLEAR' });
  };

  return {
    controlsContextValue: contextValue,
    disableCancel,
    disableClose,
    disablePrimary,
    onCancel,
    onClose,
    onStart,
  };
};
