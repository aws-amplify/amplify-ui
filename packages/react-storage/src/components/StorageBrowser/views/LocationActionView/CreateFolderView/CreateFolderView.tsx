import React from 'react';

import { Title } from '../Controls/Title';

import { ActionStartControl } from '../../../controls/ActionStartControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { FolderNameFieldControl } from '../../../controls/FolderNameFieldControl';
import { ControlsContextProvider } from '../../../controls/context';
import { MessageControl } from '../../../controls/MessageControl';

import { useDisplayText } from '../../../displayText';
import { CLASS_BASE } from '../../constants';
import { resolveClassName } from '../../utils';

import { CreateFolderViewProps } from './types';
import { useCreateFolderView } from './useCreateFolderView';
import { isValidFolderName } from './utils';

export function CreateFolderView({
  className,
  ...props
}: CreateFolderViewProps): React.JSX.Element {
  const {
    actionExitLabel,
    actionStartLabel,
    folderNameLabel,
    folderNamePlaceholder,
    getActionCompleteMessage,
    getValidationMessage,
  } = useDisplayText()['CreateFolderView'];

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
    <div className={resolveClassName(CLASS_BASE, className)}>
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
        }}
        onActionExit={onActionExit}
        onActionStart={onActionStart}
        onFolderNameChange={onFolderNameChange}
        onValidateFolderName={onValidateFolderName}
      >
        <ActionExitControl />
        <Title />
        <FolderNameFieldControl />
        <ActionStartControl
          className={`${CLASS_BASE}__create-folder-action-start`}
        />
        <MessageControl />
      </ControlsContextProvider>
    </div>
  );
}
