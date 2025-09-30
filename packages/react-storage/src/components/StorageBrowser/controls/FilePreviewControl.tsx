import React from 'react';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { FilePreview } from '../components/composables/FilePreview';
import { useControlsContext } from './context';

export function FilePreviewControl(): React.JSX.Element | null {
  const { data, onRetryFilePreview, onSelectActiveFile } = useControlsContext();
  const { filePreviewState, activeFile, activeFileHasNext, activeFileHasPrev } =
    data;
  const props = {
    filePreview: filePreviewState,
    activeFile,
    activeFileHasNext,
    activeFileHasPrev,
    onRetryFilePreview,
    onSelectActiveFile,
  };

  const Resolved = useResolvedComposable(FilePreview, 'FilePreview');

  if (!activeFile) {
    return null;
  }

  return <Resolved {...props} />;
}
