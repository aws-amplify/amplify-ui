import React from 'react';

import { Controls } from '../../Controls';
import { ViewElement } from '../../../context/elements';
import { DataTableControl } from '../../../controls/DataTableControl';
import { ControlsContextProvider } from '../../../controls/context';
import { CLASS_BASE, AMPLIFY_CLASS_BASE } from '../../constants';
import { Title } from '../Controls/Title';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { getActionViewTableData } from '../getActionViewTableData';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { resolveClassName } from '../../utils';
import { useDeleteView } from './useDeleteView';
import { DeleteViewProps } from './types';

const { Exit } = Controls;

export const DeleteView = ({
  className,
  onExit: onExitProps,
}: DeleteViewProps): React.JSX.Element => {
  const {
    isProcessing,
    isProcessingComplete,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionStart,
    onExit,
    onTaskCancel,
  } = useDeleteView({ onExit: onExitProps });

  const tableData = getActionViewTableData({
    tasks,
    locationKey: location.key,
    isProcessing,
    onTaskCancel,
  });

  return (
    <div className={resolveClassName(AMPLIFY_CLASS_BASE, className)}>
      <ControlsContextProvider
        data={{
          actionCancelLabel: 'Cancel',
          actionStartLabel: 'Start',
          isActionCancelDisabled: !isProcessing || isProcessingComplete,
          isActionStartDisabled: isProcessing || isProcessingComplete,
          statusCounts,
          tableData,
        }}
        onActionStart={onActionStart}
        onActionCancel={onActionCancel}
      >
        <ViewElement className={`${AMPLIFY_CLASS_BASE}__navigation`}>
          <Exit onClick={onExit} disabled={isProcessing} />
        </ViewElement>

        <Title />

        <DataTableControl />

        <ViewElement className={`${AMPLIFY_CLASS_BASE}__summary`}>
          <StatusDisplayControl />
        </ViewElement>
        <ViewElement className={`${AMPLIFY_CLASS_BASE}__footer`}>
          <ViewElement className={`${AMPLIFY_CLASS_BASE}__message`}>
            {/* TODO: confirmation message goes here */}
          </ViewElement>
          <ViewElement className={`${AMPLIFY_CLASS_BASE}__buttons`}>
            <ActionCancelControl />
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
};
