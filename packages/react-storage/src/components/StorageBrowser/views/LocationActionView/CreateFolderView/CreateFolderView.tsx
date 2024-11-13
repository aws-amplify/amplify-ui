import React from 'react';

import { ActionStartControl } from '../../../controls/ActionStartControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { FolderNameFieldControl } from '../../../controls/FolderNameFieldControl';
import { MessageControl } from '../../../controls/MessageControl';
import { TitleControl } from '../../../controls/TitleControl';
import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';
import { resolveClassName } from '../../utils';
import { CreateFolderViewProps } from './types';
import { useCreateFolderView } from './useCreateFolderView';
import { isValidFolderName } from './utils';
import { AMPLIFY_CLASS_BASE, CLASS_BASE } from '../../constants';

export function CreateFolderView({
  className,
  ...props
}: CreateFolderViewProps): React.JSX.Element {
  const {
    CreateFolderView: {
      actionExitLabel,
      actionStartLabel,
      folderNameLabel,
      folderNamePlaceholder,
      getActionCompleteMessage,
      getValidationMessage,
      title,
    },
  } = useDisplayText();

  const {
    folderName,
    folderNameId,
    isProcessing,
    isProcessingComplete,
    onActionStart,
    onActionExit,
    onFolderNameChange,
    statusCounts,
  } = useCreateFolderView(props);

  const [validationMessage, setValidationMessage] = React.useState<
    string | undefined
  >();

  const messageContent = isProcessingComplete
    ? getActionCompleteMessage(statusCounts)
    : undefined;

  const onValidateFolderName = (value: string) => {
    setValidationMessage(() =>
      isValidFolderName(value) ? undefined : getValidationMessage(value)
    );
  };

  const isActionStartDisabled =
    !folderName.length ||
    !!validationMessage ||
    isProcessing ||
    isProcessingComplete;

  return (
    <div className={resolveClassName(AMPLIFY_CLASS_BASE, className)}>
      <ControlsContextProvider
        data={{
          actionExitLabel,
          folderNameId,
          folderNameLabel,
          folderNamePlaceholder,
          folderNameValidationMessage: validationMessage,
          actionStartLabel,
          isActionStartDisabled,
          isActionExitDisabled: isProcessing,
          messageContent,
          title,
        }}
        onActionExit={onActionExit}
        onActionStart={onActionStart}
        onFolderNameChange={onFolderNameChange}
        onValidateFolderName={onValidateFolderName}
      >
        <ActionExitControl />
        <TitleControl className={`${CLASS_BASE}__create-folder-view-title`} />
        <FolderNameFieldControl />
        <ActionStartControl />
        <MessageControl />
      </ControlsContextProvider>
    </div>
  );
}
