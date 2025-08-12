import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import type { FilePreview } from '../createStorageBrowser/types';

export const { FilePreviewContext, useFilePreview } = createContextUtilities<
  FilePreview | undefined
>({
  contextName: 'FilePreview',
  errorMessage: '`useFilePreview` must be called inside `FilePreviewProvider`',
});

export function FilePreviewProvider({
  children,
  filePreview,
}: {
  children?: React.ReactNode;
  filePreview?: FilePreview;
}): React.JSX.Element {
  return (
    <FilePreviewContext.Provider value={filePreview}>
      {children}
    </FilePreviewContext.Provider>
  );
}
