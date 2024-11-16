import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { ControlsContextProvider } from '../../../controls/context';

import { MessageControl } from '../../../controls/MessageControl';
import { ViewElement } from '../../../context/elements';
import { STORAGE_BROWSER_BLOCK } from '../../../constants';
import { FolderData } from '../../../actions';
import { useDisplayText } from '../../../displayText';

export interface FoldersMessageProps {
  hasError?: boolean;
  message?: string;
  folders?: FolderData[];
  query?: string;
}

const defaultValue: FoldersMessageProps = {};
export const { useFoldersMessage, FoldersMessageProvider } =
  createContextUtilities({ contextName: 'FoldersMessage', defaultValue });

export const FoldersMessageControl = (): React.JSX.Element => {
  const {
    CopyView: { getListFoldersResultsMessage },
  } = useDisplayText();
  const { hasError, folders, message, query } = useFoldersMessage();

  const messageContent = getListFoldersResultsMessage({
    hasError,
    folders,
    message,
    query,
  });

  return (
    <ControlsContextProvider data={{ message: messageContent }}>
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
        <MessageControl />
      </ViewElement>
    </ControlsContextProvider>
  );
};

FoldersMessageControl.displayName = 'FoldersMessage';
