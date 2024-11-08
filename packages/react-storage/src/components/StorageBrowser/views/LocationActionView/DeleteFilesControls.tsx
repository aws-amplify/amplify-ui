import React from 'react';

import { Controls } from '../Controls';
import { ViewElement } from '../../context/elements';
import { ControlsContextProvider } from '../../controls/context';
import { CLASS_BASE } from '../constants';
import { useDeleteView } from './DeleteView/useDeleteView';
import { ControlsContext } from '../../controls/types';
import { useStore } from '../../providers/store';
import { getActionViewTableData } from './utils';
import { LocationData } from '../../actions';
import { getFolderNameFromPath } from './utils/getFolderNameFromPath';
import { ActionStartControl } from '../../controls/ActionStartControl';
import { ActionCancelControl } from '../../controls/ActionCancelControl';
import { DataTableControl } from '../../controls/DataTableControl';
import { StatusDisplayControl } from '../../controls/StatusDisplayControl';
import { TitleControl } from '../../controls/TitleControl';

const { Exit } = Controls;

export const DeleteFilesControls = (props?: {
  onExit?: (location: LocationData) => void;
}): React.JSX.Element => {
  const {
    isProcessing,
    isProcessingComplete,
    onActionCancel,
    onActionStart,
    onExit,
    statusCounts,
    tasks,
  } = useDeleteView(props);

  const [{ location }] = useStore();
  const { current, key } = location;

  const title = key ? getFolderNameFromPath(key) : current.bucket;

  const tableData = getActionViewTableData({
    tasks,
    folder: key,
    isProcessing,
  });
  const contextValue: ControlsContext = {
    data: {
      statusCounts,
      tableData,
      isActionStartDisabled: isProcessing || isProcessingComplete,
      actionStartLabel: 'Start',
      actionCancelLabel: 'Cancel',
      isActionCancelDisabled: !isProcessing || isProcessingComplete,
      title,
    },
    onActionStart,
    onActionCancel,
  };

  return (
    <ControlsContextProvider {...contextValue}>
      <Exit onClick={onExit} disabled={isProcessing} />
      <TitleControl />
      <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
        <DataTableControl className={`${CLASS_BASE}__table`} />
      </ViewElement>
      <ViewElement className={`${CLASS_BASE}__action-footer`}>
        <StatusDisplayControl
          className={`${CLASS_BASE}__action-status-display`}
        />
        <ActionCancelControl className={`${CLASS_BASE}__cancel`} />
        <ActionStartControl />
      </ViewElement>
    </ControlsContextProvider>
  );
};
