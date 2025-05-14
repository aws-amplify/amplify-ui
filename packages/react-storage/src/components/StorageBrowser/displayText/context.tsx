import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';

import { DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT } from './libraries';
import type {
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

export function resolveDisplayText(
  displayText: StorageBrowserDisplayText | undefined
): DefaultStorageBrowserDisplayText {
  if (!displayText) return DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT;
  // override
  const {
    CopyView,
    CreateFolderView,
    DeleteView,
    LocationDetailView,
    LocationsView,
    UploadView,
  } = displayText;
  return {
    CopyView: { ...DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CopyView, ...CopyView },
    CreateFolderView: {
      ...DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.CreateFolderView,
      ...CreateFolderView,
    },
    DeleteView: {
      ...DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.DeleteView,
      ...DeleteView,
    },
    LocationDetailView: {
      ...DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationDetailView,
      ...LocationDetailView,
    },
    LocationsView: {
      ...DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.LocationsView,
      ...LocationsView,
    },
    UploadView: {
      ...DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT.UploadView,
      ...UploadView,
    },
  };
}

export function DisplayTextProvider({
  children,
  displayText: _override,
}: {
  children?: React.ReactNode;
  displayText?: StorageBrowserDisplayText;
}): React.JSX.Element {
  // do deep merge here of default and override here
  const resolvedDisplayText = React.useMemo(
    () => resolveDisplayText(_override),
    [_override]
  );
  return (
    <DisplayTextContext.Provider value={resolvedDisplayText}>
      {children}
    </DisplayTextContext.Provider>
  );
}
