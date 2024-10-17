import * as React from 'react';
import { MessagesControl } from './Controls/MessagesControl';
import { AutoHidablePromptControl } from './Controls/PromptControl';

export const MessageHistoryView = (): JSX.Element => {
  return (
    <>
      <AutoHidablePromptControl />
      <MessagesControl />
    </>
  );
};
