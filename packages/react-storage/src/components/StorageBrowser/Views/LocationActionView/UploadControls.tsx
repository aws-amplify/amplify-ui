import React from 'react';

import { useControl } from '../../context/controls';
import { FileItem } from '../../context/types';

import { CLASS_BASE } from '../constants';
import { Controls, NavigateItem } from '../Controls';
import { Navigate } from './Controls';
import { Column, RenderRowItem } from '../Controls/Table';

import { CancelableTask, useHandleUpload } from './useHandleUpload';

const { Summary, Table } = Controls;

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

const renderRowItem: RenderRowItem<CancelableTask> = (row, index) => {
  return (
    <Table.TableRow key={index}>
      {LOCATION_ACTION_VIEW_COLUMNS.map((column) => {
        return (
          <Table.TableData key={`${index}-${column.header}`}>
            {column.key === 'key' ? (
              <>{row.key}</>
            ) : column.key === 'status' ? (
              <>{row.status}</>
            ) : column.key === 'progress' ? (
              <>{row.progress}</>
            ) : column.key === 'cancel' ? (
              <button onClick={row.cancel}>Cancel</button>
            ) : null}
          </Table.TableData>
        );
      })}
    </Table.TableRow>
  );
};

export const UploadControls = (): JSX.Element => {
  const [state] = useControl({
    type: 'ACTION_SELECT',
  });
  const { destination, items, name } = state.selected;

  const [tasks, handleUpload] = useHandleUpload({
    destination: destination!,
    items: items! as FileItem[],
  });

  return items ? (
    <>
      <h2>{name}</h2>
      <div className={`${CLASS_BASE}__actions__container`}>
        <Navigate />
        <NavigateItem.Button
          onClick={() => {
            if (!items) return;
            handleUpload();
          }}
        >
          Start
        </NavigateItem.Button>
      </div>

      <Summary />
      <Table
        data={tasks}
        columns={LOCATION_ACTION_VIEW_COLUMNS}
        renderRowItem={renderRowItem}
      />
    </>
  ) : (
    <span>No items selected.</span>
  );
};
