import React, { useState, useCallback } from 'react';
import { Alert, Button } from '@aws-amplify/ui-react';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { PreviewPlaceholder } from './PreviewPlaceholder';

interface VideoPreviewProps {
  url: string;
  fileKey: string;
}

export function VideoPreview({
  url,
  fileKey,
}: VideoPreviewProps): React.JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [videoKey, setVideoKey] = useState(0);

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
      <div className={`${STORAGE_BROWSER_BLOCK}__video-error`}>
        <Alert
          variation="error"
          isDismissible={false}
          heading="Video Loading Error"
        >
          {error}
        </Alert>
        <Button
          variation="primary"
          size="small"
          onClick={handleRetry}
          marginTop="15px"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <>
      {isLoading && <PreviewPlaceholder />}
      <video
        key={videoKey}
        className={`${STORAGE_BROWSER_BLOCK}__video-preview`}
        controls
        preload="metadata"
        onError={handleError}
        onLoadStart={handleLoadStart}
        onLoadedData={handleLoadedData}
        aria-label={`Video preview for ${fileKey}`}
        style={{ display: isLoading ? 'none' : 'block' }}
      >
        <source src={url} />
        Your browser does not support the video tag.
      </video>
    </>
  );
}
