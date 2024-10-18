import * as React from 'react';
import { MessagesControl } from './MessagesControl';
import { AutoHidablePromptControl } from './PromptControl';

export const MessageHistoryControl = (): JSX.Element => {
  return (
    <>
      <AutoHidablePromptControl />
      <MessagesControl />
    </>
  );
};
