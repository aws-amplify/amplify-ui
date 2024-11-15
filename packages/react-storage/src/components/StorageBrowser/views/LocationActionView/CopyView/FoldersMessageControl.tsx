import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { ControlsContextProvider } from '../../../controls/context';
import { MessageProps } from '../../../composables/Message';
import { MessageControl } from '../../../controls/MessageControl';
import { ViewElement } from '../../../context/elements';
import { STORAGE_BROWSER_BLOCK } from '../../../constants';

export interface FoldersMessageProps extends MessageProps {}

const defaultValue: FoldersMessageProps = {};
export const { useFoldersMessage, FoldersMessageProvider } =
  createContextUtilities({ contextName: 'FoldersMessage', defaultValue });

export const FoldersMessageControl = (): React.JSX.Element => {
  const message = useFoldersMessage();

  return (
    <ControlsContextProvider data={{ message }}>
      <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
        <MessageControl />
      </ViewElement>
    </ControlsContextProvider>
  );
};

FoldersMessageControl.displayName = 'FoldersMessage';
