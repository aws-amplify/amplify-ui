import React from 'react';
import { useResolvedComposable } from './hooks/useResolvedComposable';
import { ObjectPreview } from '../components/composables/ObjectPreview';
import { useControlsContext } from './context';

export const ObjectPreviewControl = (): React.JSX.Element => {
  const { data, onCloseObjectPreview, retryPreview } = useControlsContext();
  const { objectPreviewData } = data;
  const props = { ...objectPreviewData, onCloseObjectPreview, retryPreview };

  const Resolved = useResolvedComposable(ObjectPreview, 'ObjectPreview');

  return <Resolved {...props} />;
};
