import React from 'react';

import { ControlsContextProvider } from '../../../controls/context';
import { useDisplayText } from '../../../displayText';

import type { CreateFolderViewProviderProps } from './types';
import { isValidFolderName } from './utils';

export function CreateFolderViewProvider({
  children,
  ...props
}: CreateFolderViewProviderProps): React.JSX.Element {
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
  } = props;

  const [validationMessage, setValidationMessage] = React.useState<
    string | undefined
  >();

  const message = isProcessingComplete
    ? getActionCompleteMessage({ counts: statusCounts })
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
        message,
        title,
      }}
      onActionExit={onActionExit}
      onActionStart={onActionStart}
      onFolderNameChange={onFolderNameChange}
      onValidateFolderName={onValidateFolderName}
    >
      {children}
    </ControlsContextProvider>
  );
}
