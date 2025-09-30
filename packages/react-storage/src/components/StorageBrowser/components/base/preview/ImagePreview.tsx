import React, { useCallback, useState } from 'react';
import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { PreviewPlaceholder } from './PreviewPlaceholder';
import { PreviewFallback } from './PreviewFallback';
import { getFileName } from '../../../views/utils/files/fileName';
import { useDisplayText } from '../../../displayText';
import type { PreviewComponentProps } from './type';

export function ImagePreview({
  url,
  fileKey,
}: PreviewComponentProps): React.JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageKey, setImageKey] = useState(0);
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: { imageLoadErrorDescription },
  } = displayText;

  const handleError = useCallback(() => {
    setError('Failed to load image');
    setIsLoading(false);
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setImageKey((prev) => prev + 1);
  }, []);

  if (error) {
    return (
      <PreviewFallback
        fileKey={fileKey}
        message={error}
        description={imageLoadErrorDescription}
        isError
        onRetry={handleRetry}
        showRetry
      />
    );
  }

  return (
    <div className={`${STORAGE_BROWSER_BLOCK}__image-container`}>
      {isLoading && <PreviewPlaceholder />}
      <div
        className={`${STORAGE_BROWSER_BLOCK}__image-preview`}
        style={{ display: isLoading ? 'none' : 'flex' }}
      >
        <img
          key={imageKey}
          className={classNames(ComponentClassName.StorageImage)}
          src={url}
          alt={`Image preview for ${getFileName(fileKey)}`}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}
