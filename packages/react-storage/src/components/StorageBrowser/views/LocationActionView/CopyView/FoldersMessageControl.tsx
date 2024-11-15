import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { ControlsContextProvider } from '../../../controls/context';
import { MessageProps } from '../../../composables/Message';
import { MessageControl } from '../../../controls/MessageControl';

export interface FoldersMessageProps extends MessageProps {}

const defaultValue: FoldersMessageProps = {};
export const { useFoldersMessage, FoldersMessageProvider } =
  createContextUtilities({ contextName: 'FoldersMessage', defaultValue });

export const FoldersMessageControl = (): React.JSX.Element => {
  const message = useFoldersMessage();

  return (
    <ControlsContextProvider data={{ message }}>
      <MessageControl />
    </ControlsContextProvider>
  );
};

FoldersMessageControl.displayName = 'FoldersMessage';
