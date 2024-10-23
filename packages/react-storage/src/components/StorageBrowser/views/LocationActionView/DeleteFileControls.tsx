import React from 'react';

import { humanFileSize } from '@aws-amplify/ui';

import { ButtonElement } from '../../context/elements';

import { Controls } from '../Controls';
import { Column, RenderRowItem, TableDataText } from '../Controls/Table';
import { CLASS_BASE } from '../constants';
import { TaskStatus } from '../../tasks';
import { HeadingControl } from '../Controls/Heading';
import { Title } from './Controls/Title';
import { UseDeleteActionView } from '../hooks/useDeleteActionView';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { displayText } from '../../displayText/en';
import { STATUS_DISPLAY_VALUES } from './constants';
import { ActionIcon } from './shared/ActionIcon';
import { ControlsContextProvider } from '../../controls/context';

interface DeleteFilesColumns {
  key: string;
  folder: string;
  type: string;
  size: string;
  status: TaskStatus;
  action: undefined | (() => void);
}

const { Cancel, Exit, Primary, Table } = Controls;

const { actionSelectedText } = displayText;

const LOCATION_ACTION_VIEW_COLUMNS: Column<DeleteFilesColumns>[] = [
  { key: 'key', header: 'Name' },
  { key: 'folder', header: 'Folder' },
  { key: 'type', header: 'Type' },
  { key: 'size', header: 'Size' },
  { key: 'status', header: 'Status' },
  { key: 'action', header: '' },
  // { key: 'progress', header: 'Progress' },
  // { key: 'cancel', header: 'Cancel' },
];

export const DeleteFileControls = (): JSX.Element => {
  const {
    controlsContextValue,
    disableCancel,
    disableClose,
    disablePrimary,
    path,
    tasks,
    onClose,
    onCancel,
    onStart,
    isProcessing,
  } = UseDeleteActionView();

  const renderHeaderItem = React.useCallback(
    (column: Column<DeleteFilesColumns>) => {
      const { header, key } = column;
      return (
        <Table.TableHeader key={header} variant={key}>
          {column.header}
        </Table.TableHeader>
      );
    },
    []
  );

  const renderRowItem: RenderRowItem<DeleteFilesColumns> = (row, index) => {
    const renderTableData = (
      columnKey: keyof DeleteFilesColumns,
      row: DeleteFilesColumns
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
          return (
            <TableDataText>
              {humanFileSize(parseInt(row.size), true)}
            </TableDataText>
          );
        case 'status':
          return (
            <TableDataText>{STATUS_DISPLAY_VALUES[row.status]}</TableDataText>
          );
        // case 'progress':
        //   return (
        //     <TableDataText>{`${getPercentValue(row.progress)}%`}</TableDataText>
        //   );
        case 'action':
          if (row.action && tasks.length > 1) {
            return isProcessing ? (
              <Cancel
                onClick={() => row.action?.()}
                ariaLabel={`Cancel item: ${row.key}`}
              />
            ) : (
              <Cancel
                onClick={() => row.action?.()}
                ariaLabel={`Remove item: ${row.key}`}
              />
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

  const selectedItemsData = tasks.map((item) => {
    return {
      ...item,
      folder: path,
      type: item.key.slice(item.key.lastIndexOf('.') + 1) || '-',
      action: isProcessing ? item.cancel : item.remove,
      // @ts-ignore
      // FIXME: task type doesn't have size property, but the object does have it
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      size: item.size,
    };
  });

  return (
    <ControlsContextProvider {...controlsContextValue}>
      <Exit onClick={onClose} disabled={disableClose} />
      <Title />
      <Primary
        disabled={disablePrimary}
        onClick={() => {
          onStart();
        }}
      >
        Start
      </Primary>
      <ButtonElement
        variant="cancel"
        disabled={disableCancel}
        className={`${CLASS_BASE}__cancel`}
        onClick={() => {
          onCancel();
        }}
      >
        Cancel
      </ButtonElement>
      <StatusDisplayControl
        className={`${CLASS_BASE}__action-status-display`}
      />
      <HeadingControl level={3}>{actionSelectedText}</HeadingControl>
      <Table
        data={selectedItemsData}
        columns={LOCATION_ACTION_VIEW_COLUMNS}
        renderHeaderItem={renderHeaderItem}
        renderRowItem={renderRowItem}
      />
    </ControlsContextProvider>
  );
};
