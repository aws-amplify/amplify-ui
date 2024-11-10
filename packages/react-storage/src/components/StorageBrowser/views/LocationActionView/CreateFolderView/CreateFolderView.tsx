import React from 'react';

import { Controls } from '../../Controls';
import { Title } from '../Controls/Title';

import { ActionStartControl } from '../../../controls/ActionStartControl';
import { FolderNameFieldControl } from '../../../controls/FolderNameFieldControl';
import { ControlsContextProvider } from '../../../controls/context';
import { MessageControl } from '../../../controls/MessageControl';
import { ControlsContext } from '../../../controls/types';
import { useDisplayText } from '../../../displayText';
import { CLASS_BASE } from '../../constants';
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
  const { getActionCompleteMessage, getValidationMessage } =
    useDisplayText()['CreateFolderView'];

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

  // FIXME: Eventually comes from useView hook
  const contextValue: ControlsContext = {
    data: {
      folderNameLabel: 'Enter folder name:',
      folderNamePlaceholder: 'Folder name',
      folderNameId,
      folderNameValidationMessage: validationMessage,
      actionStartLabel: 'Create Folder',
      isActionStartDisabled:
        !folderName.length ||
        !!validationMessage ||
        isProcessing ||
        isProcessingComplete,
      messageContent,
    },
    onActionStart,
    onFolderNameChange,
    onValidateFolderName: (value) => {
      setValidationMessage(() =>
        isValidFolderName(value) ? getValidationMessage(value) : undefined
      );
    },
  };

  return (
    <div className={resolveClassName(CLASS_BASE, className)}>
      <ControlsContextProvider {...contextValue}>
        <Exit onClick={onExit} />
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
