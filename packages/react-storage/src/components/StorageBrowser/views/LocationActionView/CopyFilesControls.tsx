import React from 'react';

import { ButtonElement, ViewElement } from '../../context/elements';

import { Controls } from '../Controls';

import { Title } from './Controls/Title';
import { displayText } from '../../displayText/en';
import { CLASS_BASE } from '../constants';
import { DestinationPicker } from './DestinationPicker';

import { useCopyView } from './CopyView/useCopyView';
import { Column } from '../Controls/Table';
import { DataTableControl } from '../../controls/DataTableControl';
import { ControlsContextProvider } from '../../controls/context';
import { getDeleteActionViewTableData } from './utils';
import { useStore } from '../../providers/store';
import { ControlsContext } from '../../controls/types';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { getTasksHaveStarted } from './utils';
import { DescriptionList } from '../../components/DescriptionList';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { getDestinationListFullPrefix } from './utils/getDestinationPickerDataTable';

const RESULT_COMPLETE_MESSAGE = 'File copied';
const RESULT_FAILED_MESSAGE = 'There was an issue copying the files.';

const { Exit } = Controls;
const { actionSelectedText } = displayText;

interface SelectedFilesColumns {
  key: string;
  folder: string;
  type: string;
  size: string;
  status: string;
  action: undefined | (() => void);
}

const SELECTED_FILES_COLUMNS: Column<SelectedFilesColumns>[] = [
  { key: 'key', header: 'Name' },
  { key: 'folder', header: 'Folder' },
  { key: 'type', header: 'Type' },
  { key: 'size', header: 'Size' },
  { key: 'status', header: 'Status' },
  { key: 'action', header: '' },
];

// @TODO for CopyFilesControls
// 1. Implement default sort when new table is ready
// 2. Fix styling so that list only takes up 50% of parent container
// 3. Fix useProcessTasks so that canceling a non-queued item actually works

export const CopyFilesControls = ({
  onExit: _onExit,
}: {
  onExit?: () => void;
}): React.JSX.Element => {
  const {
    destinationList,
    onSetDestinationList,
    disableCancel,
    disableClose,
    disablePrimary,
    onExit,
    onActionCancel,
    onActionStart,
    taskCounts,
    tasks,
  } = useCopyView({ onExit: _onExit });

  const [{ location }] = useStore();
  const { current } = location;
  const path = current?.prefix;
  const tableData = getDeleteActionViewTableData({
    tasks,
    taskCounts,
    path: path ?? '',
  });

  const contextValue: ControlsContext = {
    data: {
      taskCounts,
      tableData,
      actionStartLabel: 'Start',
      isActionStartDisabled: disablePrimary,
    },
    actionsConfig: { type: 'BATCH_ACTION', isCancelable: true },
    onActionStart,
  };
  const hasStarted = getTasksHaveStarted(taskCounts);

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit
        onClick={() => {
          onExit(current!);
        }}
        disabled={disableClose}
      />
      <Title />
      {hasStarted ? (
        <ViewElement className={`${CLASS_BASE}__action-destination`}>
          <DescriptionList
            descriptions={[
              {
                term: `${displayText.actionDestination}:`,
                details: getDestinationListFullPrefix(destinationList),
              },
            ]}
          />
        </ViewElement>
      ) : (
        <DestinationPicker
          destinationList={destinationList}
          onSetDestinationList={onSetDestinationList}
        />
      )}
      <StatusDisplayControl
        className={`${CLASS_BASE}__action-status-display`}
      />
      <ViewElement className="storage-browser__table">
        <h3>{actionSelectedText}</h3>
        <DataTableControl className={`${CLASS_BASE}__table`} />
      </ViewElement>
      <ActionStartControl className={`${CLASS_BASE}__upload-action-start`} />
      <ButtonElement
        variant="cancel"
        disabled={disableCancel}
        className={`${CLASS_BASE}__cancel`}
        onClick={() => onActionCancel()}
      >
        Cancel
      </ButtonElement>
    </ControlsContextProvider>
  );
};
