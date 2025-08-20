import React from 'react';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { FilePreview } from '../components/composables/FilePreview';
import { useControlsContext } from './context';

export function FilePreviewControl(): React.JSX.Element {
  const { data, onCloseFilePreview, onRetryFilePreview } = useControlsContext();
  const { filePreviewState } = data;
  const props = { ...filePreviewState, onCloseFilePreview, onRetryFilePreview };

  const Resolved = useResolvedComposable(FilePreview, 'FilePreview');

  return <Resolved {...props} />;
}
