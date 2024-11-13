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
import { AMPLIFY_CLASS_BASE, CLASS_BASE } from '../../constants';
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
    onActionExit,
    onActionStart,
    onDestinationChange,
    onTaskRemove,
  } = useCopyView(props);

  const tableData = getActionViewTableData({
    tasks,
    locationKey: location.key,
    isProcessing,
    onTaskRemove,
  });

  const isActionStartDisabled =
    isProcessing || isProcessingComplete || destinationList.length === 0;

  const isActionCancelDisabled = !isProcessing || isProcessingComplete;

  return (
    <div className={resolveClassName(`${AMPLIFY_CLASS_BASE}`, className)}>
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
        onActionCancel={onActionCancel}
        onActionExit={onActionExit}
      >
        <ActionExitControl />
        <TitleControl className={`${CLASS_BASE}__copy-view-title`} />
        <DataTableControl />
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

        <ViewElement className={`${AMPLIFY_CLASS_BASE}__footer`}>
          {isProcessing || isProcessingComplete ? (
            <StatusDisplayControl />
          ) : (
            <ViewElement className={`${CLASS_BASE}__action-status-display`}>
              Copy action may overwrite existing files at selected destination.
            </ViewElement>
          )}
          <ViewElement className={`${AMPLIFY_CLASS_BASE}__buttons`}>
            <ActionCancelControl />
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </ControlsContextProvider>
    </div>
  );
}
