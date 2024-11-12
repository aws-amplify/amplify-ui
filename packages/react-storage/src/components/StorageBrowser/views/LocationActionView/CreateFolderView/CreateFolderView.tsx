import React from 'react';

import { Controls } from '../../Controls';
import { Title } from '../Controls/Title';

import { ActionStartControl } from '../../../controls/ActionStartControl';
import { FolderNameFieldControl } from '../../../controls/FolderNameFieldControl';
import { ControlsContextProvider } from '../../../controls/context';
import { AMPLIFY_CLASS_BASE, CLASS_BASE } from '../../constants';
import { MessageControl } from '../../../controls/MessageControl';
import { ControlsContext } from '../../../controls/types';
import { useDisplayText } from '../../../displayText';
import { resolveClassName } from '../../utils';

import { CreateFolderViewProps } from './types';
import { useCreateFolderView } from './useCreateFolderView';

const { Exit } = Controls;

export const isValidFolderName = (name: string | undefined): boolean =>
  !!name?.length && !name.includes('/') && !name.includes('.');

export function CreateFolderView({
  className,
  ...props
}: CreateFolderViewProps): React.JSX.Element {
  const {
    getActionCompleteMessage,
    getValidationMessage,
    actionStartLabel,
    folderNameLabel,
    folderNamePlaceholder,
  } = useDisplayText()['CreateFolderView'];

  const {
    folderName,
    folderNameId,
    isProcessing,
    isProcessingComplete,
    onActionStart,
    onExit,
    onFolderNameChange,
    statusCounts,
  } = useCreateFolderView(props);

  const [validationMessage, setValidationMessage] = React.useState<
    string | undefined
  >();

  const messageContent = isProcessingComplete
    ? getActionCompleteMessage(statusCounts)
    : undefined;

  const contextValue: ControlsContext = {
    data: {
      folderNameId,
      folderNameLabel,
      folderNamePlaceholder,
      folderNameValidationMessage: validationMessage,
      actionStartLabel,
      isActionStartDisabled:
        !folderName.length ||
        !!validationMessage ||
        isProcessing ||
        isProcessingComplete ||
        statusCounts.FAILED > 0,
      messageContent,
    },
    onActionStart,
    onFolderNameChange,
    onValidateFolderName: (value) => {
      setValidationMessage(() =>
        isValidFolderName(value) ? undefined : getValidationMessage(value)
      );
    },
  };

  return (
    <div className={resolveClassName(AMPLIFY_CLASS_BASE, className)}>
      <ControlsContextProvider {...contextValue}>
        <Exit onClick={onExit} />
        <Title />
        <FolderNameFieldControl />
        <ActionStartControl />
        <MessageControl />
      </ControlsContextProvider>
    </div>
  );
}
