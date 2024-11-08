import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT } from './libraries';
import {
  DefaultStorageBrowserDisplayText,
  StorageBrowserDisplayText,
} from './types';

export const { DisplayTextContext, useDisplayText } = createContextUtilities<
  DefaultStorageBrowserDisplayText,
  'DisplayText'
>({
  contextName: 'DisplayText',
  errorMessage: '`useDisplayText` must be called inside `DisplayTextProvider`',
});

export function DisplayTextProvider({
  children,
  displayText: _override,
}: {
  children?: React.ReactNode;
  displayText?: StorageBrowserDisplayText;
}): React.JSX.Element {
  // do deep merge here of default and override here
  return (
    <DisplayTextContext.Provider value={DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT}>
      {children}
    </DisplayTextContext.Provider>
  );
}
