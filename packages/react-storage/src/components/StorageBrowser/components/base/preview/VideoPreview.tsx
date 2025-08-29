import React, { useState, useCallback } from 'react';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { PreviewPlaceholder } from './PreviewPlaceholder';
import { PreviewFallback } from './PreviewFallback';
import { getFileName } from '../../../views/utils/files/fileName';
import { useDisplayText } from '../../../displayText';
import type { PreviewComponentProps } from './type';

export function VideoPreview({
  url,
  fileKey,
}: PreviewComponentProps): React.JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoKey, setVideoKey] = useState(0);
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: { videoLoadErrorDescription },
  } = displayText;

  const handleError = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement>) => {
      const videoElement = event.currentTarget;
      const errorCode = videoElement.error?.code;

      let errorMessage = 'Failed to load video';

      switch (errorCode) {
        case MediaError.MEDIA_ERR_ABORTED:
          errorMessage = 'Video loading was aborted';
          break;
        case MediaError.MEDIA_ERR_NETWORK:
          errorMessage = 'Network error occurred while loading video';
          break;
        case MediaError.MEDIA_ERR_DECODE:
          errorMessage = 'Video format is not supported or corrupted';
          break;
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          errorMessage = 'Video format is not supported';
          break;
        default:
          errorMessage = 'An unknown error occurred while loading video';
      }

      setError(errorMessage);
      setIsLoading(false);
    },
    []
  );

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setError(null);
  }, []);

  const handleLoadedData = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setVideoKey((prev) => prev + 1);
  }, []);

  if (error) {
    return (
      <PreviewFallback
        fileKey={fileKey}
        message={error}
        description={videoLoadErrorDescription}
        isError
        onRetry={handleRetry}
        showRetry
      />
    );
  }

  return (
    <div className={`${STORAGE_BROWSER_BLOCK}__video-container`}>
      {isLoading && <PreviewPlaceholder />}
      <div
        className={`${STORAGE_BROWSER_BLOCK}__video-preview`}
        style={{ display: isLoading ? 'none' : 'flex' }}
      >
        <video
          key={videoKey}
          controls
          preload="metadata"
          onError={handleError}
          onLoadStart={handleLoadStart}
          onLoadedData={handleLoadedData}
          aria-label={`Video preview for ${getFileName(fileKey)}`}
        >
          <source src={url} />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
