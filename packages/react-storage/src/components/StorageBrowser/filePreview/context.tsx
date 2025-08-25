import React from 'react';
import { createContextUtilities } from '@aws-amplify/ui-react-core';
import type { FilePreview } from '../createStorageBrowser/types';
import type { FileData } from '../actions';

export const { FilePreviewContext, useFilePreview: useFilePreviewContext } =
  createContextUtilities<FilePreview | undefined>({
    contextName: 'FilePreview',
    defaultValue: {},
  });

export function FilePreviewProvider<
  TResolver extends ((properties: FileData) => unknown) | undefined,
>({
  children,
  filePreview,
}: {
  children: React.ReactNode;
  filePreview?: FilePreview<TResolver>;
}): React.JSX.Element {
  return (
    <FilePreviewContext.Provider value={filePreview as FilePreview}>
      {children}
    </FilePreviewContext.Provider>
  );
}
