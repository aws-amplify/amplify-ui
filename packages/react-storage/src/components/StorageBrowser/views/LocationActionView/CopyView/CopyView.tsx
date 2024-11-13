import React from 'react';

import { DescriptionList } from '../../../components/DescriptionList';
import { ViewElement } from '../../../context/elements';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';
import { CLASS_BASE } from '../../constants';
import { getActionViewTableData } from '../getActionViewTableData';
import { resolveClassName } from '../../utils';
import { DestinationPicker } from './DestinationPicker';
import { CopyViewProps } from './types';
import { useCopyView } from './useCopyView';
import { getDestinationListFullPrefix } from './utils';
import { TitleControl } from '../../../controls/TitleControl';

export function CopyView({
  className,
  ...props
}: CopyViewProps): React.JSX.Element {
  const {
    CopyView: {
      actionCancelLabel,
      actionExitLabel,
      actionSetDestination,
      actionStartLabel,
      title,
    },
  } = useDisplayText();

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
          title,
        }}
        onActionStart={onActionStart}
        onActionExit={onActionExit}
        onActionCancel={onActionCancel}
      >
        <ActionExitControl />
        <TitleControl className={`${CLASS_BASE}__copy-view-title`} />
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
