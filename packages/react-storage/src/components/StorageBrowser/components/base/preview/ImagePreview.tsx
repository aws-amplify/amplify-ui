import React, { useState, useCallback } from 'react';
import { classNames, ComponentClassName } from '@aws-amplify/ui';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { PreviewPlaceholder } from './PreviewPlaceholder';
import { PreviewFallback } from './PreviewFallback';

export function ImagePreview({
  url,
  fileKey,
}: {
  url: string | null;
  fileKey: string;
}): React.JSX.Element | null {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageKey, setImageKey] = useState(0);

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
        description="The image could not be loaded. This may be due to network issues, file corruption, or an unsupported image format."
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
          src={url!}
          alt={fileKey}
          onError={handleError}
          onLoad={handleLoad}
        />
      </div>
    </div>
  );
}
