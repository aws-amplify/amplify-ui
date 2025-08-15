import React from 'react';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { FilePreview } from '../components/composables/FilePreview';
import { useControlsContext } from './context';

export const FilePreviewControl = (): React.JSX.Element => {
  const { data, closeFilePreview, retryFilePreview } = useControlsContext();
  const { filePreviewData } = data;
  const props = { ...filePreviewData, closeFilePreview, retryFilePreview };

  const Resolved = useResolvedComposable(FilePreview, 'FilePreview');

  return <Resolved {...props} />;
};
