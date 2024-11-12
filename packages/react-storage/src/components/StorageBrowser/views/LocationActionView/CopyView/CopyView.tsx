import React from 'react';

import { ViewElement } from '../../../context/elements';

import { Title } from '../Controls/Title';
import { displayText } from '../../../displayText/en';
import { CLASS_BASE } from '../../constants';

import { DataTableControl } from '../../../controls/DataTableControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ControlsContextProvider } from '../../../controls/context';
import { getActionViewTableData } from '../getActionViewTableData';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { DescriptionList } from '../../../components/DescriptionList';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { resolveClassName } from '../../utils';
import { useDisplayText } from '../../../displayText';

import { DestinationPicker } from './DestinationPicker';
import { useCopyView } from './useCopyView';
import { CopyViewProps } from './types';
import { getDestinationListFullPrefix } from './utils';

const { actionSetDestination } = displayText;

export function CopyView({
  className,
  ...props
}: CopyViewProps): React.JSX.Element {
  const { actionCancelLabel, actionExitLabel, actionStartLabel } =
    useDisplayText()['CopyView'];

  const {
    destinationList,
    isProcessing,
    isProcessingComplete,
    location,
    statusCounts,
    tasks,
    onActionCancel,
    onActionStart,
    onDestinationChange,
    onActionExit,
    onTaskCancel,
  } = useCopyView(props);

  const tableData = getActionViewTableData({
    tasks,
    locationKey: location.key,
    isProcessing,
    onTaskCancel,
  });

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || destinationList.length === 0;

  const isActionCancelDisabled = !isProcessing || isProcessingComplete;

  return (
    <div className={resolveClassName(CLASS_BASE, className)}>
      <ControlsContextProvider
        data={{
          actionCancelLabel,
          actionExitLabel,
          actionStartLabel,
          isActionCancelDisabled,
          isActionExitDisabled: isProcessing,
          isActionStartDisabled,
          statusCounts,
          tableData,
        }}
        onActionStart={onActionStart}
        onActionExit={onActionExit}
        onActionCancel={onActionCancel}
      >
        <ActionExitControl />
        <Title />
        <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
          <DataTableControl className={`${CLASS_BASE}__copy-view-data-table`} />
        </ViewElement>
        {isProcessing || isProcessingComplete ? (
          <ViewElement className={`${CLASS_BASE}__action-destination`}>
            <DescriptionList
              descriptions={[
                {
                  term: `${actionSetDestination}:`,
                  details: getDestinationListFullPrefix(destinationList),
                },
              ]}
            />
          </ViewElement>
        ) : (
          <DestinationPicker
            destinationList={destinationList}
            onDestinationChange={onDestinationChange}
          />
        )}

        <ViewElement className={`${CLASS_BASE}__action-footer`}>
          {isProcessing || isProcessingComplete ? (
            <StatusDisplayControl
              className={`${CLASS_BASE}__action-status-display`}
            />
          ) : (
            <ViewElement className={`${CLASS_BASE}__action-status-display`}>
              Copy action may overwrite existing files at selected destination.
            </ViewElement>
          )}
          <ActionCancelControl className={`${CLASS_BASE}__cancel`} />
          <ActionStartControl
            className={`${CLASS_BASE}__upload-action-start`}
          />
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
}
