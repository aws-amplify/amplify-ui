/* eslint-disable no-console */
import React, { useState } from 'react';
import { StorageImage } from '../../../StorageImage';

export interface ContentPreviewProps {
  bucket: string;
  objectKey: string;
  fileName: string;
}

export const ContentPreview: React.FC<ContentPreviewProps> = ({
  bucket,
  objectKey,
  fileName,
}) => {
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log('bucket', bucket);

  const getFileExtension = (filename: string): string => {
    return filename.split('.').pop()?.toLowerCase() ?? '';
  };

  const isImageFile = (filename: string): boolean => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'];
    return imageExtensions.includes(getFileExtension(filename));
  };

  const isSupportedFile = (filename: string): boolean => {
    // For POC, only images are supported
    // Future: txt, csv, log, json, mp3, mp4, mov, mxf, avi
    return isImageFile(filename);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setPreviewError(null);
  };

  const handleImageError = (error: any) => {
    setIsLoading(false);
    setPreviewError(
      'Failed to load image preview. The file may be corrupted or inaccessible.'
    );
    console.error('Image preview error:', error);
  };

  const handleRetry = () => {
    setPreviewError(null);
    setIsLoading(true);
  };

  React.useEffect(() => {
    console.log(
      'effect inside ContentPreview objectKey',
      objectKey,
      previewError
    );
    setPreviewError(null);
    setIsLoading(true);
  }, [objectKey, fileName, previewError]);

  if (!isSupportedFile(fileName)) {
    return (
      <div className="amplify-storage-browser-content-preview">
        <div className="amplify-storage-browser-content-preview__unsupported">
          <div className="amplify-storage-browser-content-preview__icon">
            📄
          </div>
          <p>Preview not available for this file type.</p>
          <p>Supported formats: Images (JPG, PNG, GIF, etc.)</p>
          <small>File: {fileName}</small>
        </div>
      </div>
    );
  }

  if (previewError) {
    return (
      <div className="amplify-storage-browser-content-preview__error">
        <div className="amplify-storage-browser-content-preview__error-icon">
          ⚠️
        </div>
        <p>{previewError}</p>
        <button
          onClick={handleRetry}
          className="amplify-storage-browser-content-preview__retry-button"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="amplify-storage-browser-content-preview">
      {isLoading && (
        <div className="amplify-storage-browser-content-preview__loading">
          <div className="amplify-storage-browser-content-preview__spinner">
            Loading preview...
          </div>
        </div>
      )}
      isImageFile(fileName) && (
      <div className="amplify-storage-browser-content-preview__image-container">
        <StorageImage
          path={objectKey}
          alt={fileName}
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{
            maxWidth: '100%',
            maxHeight: '500px',
            objectFit: 'contain',
          }}
        />
      </div>
      )
    </div>
  );
};
