/* eslint-disable no-console */
import React from 'react';
import { useStore } from '../../store';
import { FileData } from '../../actions';

const SUPPORTED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

export const useObjectDetailView = (): {
  state: {
    object?: FileData;
    isLoading: boolean;
    isImage: boolean;
    error: any;
  };
  handleBack: () => void;
} => {
  const [{ selectedObject }, dispatch] = useStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  console.log('[preview] useObjectDetailView', {
    location,
    setIsLoading,
    setError,
  });

  const handleBack = React.useCallback(() => {
    console.log('[preview] calling onBack from useObjectDetailView');
    dispatch({ type: 'RESET_ACTION_TYPE' });
  }, [dispatch]);

  const isImage = React.useMemo(() => {
    if (!selectedObject || selectedObject.type !== 'FILE') return false;

    const fileName = selectedObject.key.split('/').pop() ?? selectedObject.key;
    const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
    return SUPPORTED_IMAGE_EXTENSIONS.includes(extension);
  }, [selectedObject]);

  return {
    state: {
      object: selectedObject ?? undefined,
      isLoading,
      isImage,
      error,
    },
    handleBack,
  };
};
