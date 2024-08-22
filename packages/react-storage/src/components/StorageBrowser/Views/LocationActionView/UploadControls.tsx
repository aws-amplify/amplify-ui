import React from 'react';

import { useControl } from '../../context/controls';
import { FileItem, TaskStatus } from '../../context/types';
import { StorageBrowserElements } from '../../context/elements';
import { IconVariant } from '../../context/elements/IconElement';
import { Controls } from '../Controls';
import { Title } from './Controls';
import { TableDataText, Column, RenderRowItem } from '../Controls/Table';
import { CLASS_BASE } from '../constants';

import { CancelableTask, useHandleUpload } from './useHandleUpload';

const { Icon, DefinitionDetail, DefinitionList, DefinitionTerm } =
  StorageBrowserElements;

const { Cancel, Exit, Primary, Summary, Table } = Controls;

const LOCATION_ACTION_VIEW_COLUMNS: Column<CancelableTask>[] = [
  {
    key: 'key',
    header: 'Name',
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
    <DefinitionList className="storage-browser__destination">
      <DefinitionTerm>
        Destination:
      </DefinitionTerm>
      <DefinitionDetail>{children}</DefinitionDetail>
    </DefinitionList>
  );
};

const renderRowItem: RenderRowItem<CancelableTask> = (row, index) => {
  return (
    <Table.TableRow key={index}>
      {LOCATION_ACTION_VIEW_COLUMNS.map((column) => {
        return (
          <Table.TableData
            key={`${index}-${column.header}`}
            variant={column.key}
          >
            {column.key === 'key' ? (
              <TableDataText>
                <ActionIcon status={row.status} />
                {row.key}
              </TableDataText>
            ) : column.key === 'status' ? (
              <TableDataText>{row.status}</TableDataText>
            ) : column.key === 'progress' ? (
              <TableDataText>{row.progress}</TableDataText>
            ) : column.key === 'cancel' ? (
              <Cancel
                onClick={row.cancel}
                ariaLabel={`Cancel upload for ${row.key}`}
              />
            ) : null}
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

  return items ? (
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
        data={tasks}
        columns={LOCATION_ACTION_VIEW_COLUMNS}
        renderHeaderItem={() => <div></div>} // temporary
        renderRowItem={renderRowItem}
      />
    </>
  ) : (
    <span>No items selected.</span>
  );
};
