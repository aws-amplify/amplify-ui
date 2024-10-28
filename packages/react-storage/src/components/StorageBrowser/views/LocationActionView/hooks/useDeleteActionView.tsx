import { humanFileSize, isFunction } from '@aws-amplify/ui';

import { deleteHandler } from '../../../actions/handlers';
import { TaskCounts } from '../../../controls/types';
import {
  DataTableProps,
  DataTableRow,
} from '../../../composables/DataTable/DataTable';
import { WithKey } from '../../../components/types';
import { getTaskCounts } from '../../../controls/getTaskCounts';
import { STATUS_DISPLAY_VALUES } from '../../LocationActionView/constants';
import { useStore } from '../../../providers/store';
import { useGetActionInput } from '../../../providers/configuration';
import { Task, useProcessTasks } from '../../../tasks';
import { UseActionView } from './types';
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
];

export const getDeleteActionViewTableData = ({
  tasks,
  taskCounts,
  path,
}: {
  tasks: Task[];
  taskCounts: TaskCounts;
  path: string;
}): DataTableProps => {
  const { hasStarted } = getActionViewTaskStatuses(taskCounts);

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
                      disabled: item.status !== 'QUEUED',
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

export const useDeleteActionView = ({
  onClose: _onClose,
}: {
  onClose?: () => void;
}): UseDeleteActionView => {
  const [
    {
      history,
      locationItems: { fileDataItems: selected },
    },
    dispatchStoreAction,
  ] = useStore();
  const { current } = history;
  const path = current?.prefix;
  const getInput = useGetActionInput();

  const [tasks, handleProcess] = useProcessTasks(
    // @ts-expect-error
    deleteHandler,
    selected,
    {
      concurrency: 1,
    }
  );

  const taskCounts = getTaskCounts(tasks);
  const { disableCancel, disableClose, disablePrimary } =
    getActionViewTaskStatuses(taskCounts);

  const tableData = getDeleteActionViewTableData({
    tasks,
    taskCounts,
    path: path ?? '',
  });

  const onStart = () => {
    if (!current?.prefix) return;
    handleProcess({
      config: getInput(),
      prefix: current.prefix,
    });
  };

  const onCancel = () => {
    tasks.forEach((task) => {
      // @TODO Fixme, calling cancel on task doesn't currently work
      if (isFunction(task.cancel)) task.cancel();
    });
  };

  const onClose = () => {
    // clear files state
    dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
    // clear selected action
    dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
    if (isFunction(_onClose)) _onClose();
  };

  return {
    disableCancel,
    disableClose,
    disablePrimary,
    onCancel,
    onClose,
    onStart,
    taskCounts,
    tableData,
  };
};
