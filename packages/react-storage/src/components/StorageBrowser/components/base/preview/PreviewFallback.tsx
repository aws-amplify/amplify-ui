import React from 'react';
import { Button } from '@aws-amplify/ui-react';
import { useAction } from '../../../useAction';
import { getFileKey } from '../../../actions';

export interface PreviewFallbackProps {
  fileKey: string;
  message: string;
  isError?: boolean;
  onRetry?: () => void;
  showDownload?: boolean;
  showRetry?: boolean;
}

export function PreviewFallback({
  fileKey,
  message,
  isError = false,
  onRetry,
  showDownload = true,
  showRetry = false,
}: PreviewFallbackProps): React.JSX.Element {
  const [_, handleDownload] = useAction('download');

  const handleDownloadClick = () => {
    handleDownload({
      data: {
        fileKey: getFileKey(fileKey),
        key: fileKey,
        id: crypto.randomUUID(),
      },
    });
  };

  // Different styling based on whether it's an error or just unsupported
  const containerStyle = isError
    ? {
        // Error styling
        color: '#dc2626',
        backgroundColor: '#fef2f2',
        border: '2px dashed #fecaca',
      }
    : {
        // Fallback/unsupported styling
        color: '#6b7280',
        backgroundColor: '#f9fafb',
        border: '2px dashed #d1d5db',
      };

  const icon = isError ? '⚠️' : '📄';
  const titleColor = isError ? '#991b1b' : '#374151';
  const descriptionColor = isError ? '#7f1d1d' : '#6b7280';

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        borderRadius: '8px',
        padding: '32px',
        textAlign: 'center',
        ...containerStyle,
      }}
    >
      <div
        style={{
          fontSize: '64px',
          marginBottom: '8px',
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '18px',
            marginBottom: '8px',
            color: titleColor,
          }}
        >
          {message}
        </div>
        <div
          style={{
            fontSize: '14px',
            color: descriptionColor,
            marginBottom: '8px',
          }}
        >
          {isError
            ? 'We encountered an issue while loading the file preview.'
            : 'This file type is not supported for preview.'}
        </div>
        <div
          style={{
            fontSize: '12px',
            color: descriptionColor,
            fontFamily: 'monospace',
          }}
        >
          File: {fileKey.split('/').pop()}
        </div>
      </div>

      {(showRetry || showDownload) && (
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {showRetry && onRetry && (
            <Button
              size="small"
              variation="primary"
              onClick={onRetry}
              style={{
                backgroundColor: isError ? '#dc2626' : '#3b82f6',
                borderColor: isError ? '#dc2626' : '#3b82f6',
              }}
            >
              Retry
            </Button>
          )}

          {showDownload && (
            <Button
              size="small"
              onClick={handleDownloadClick}
              style={{
                borderColor: isError ? '#dc2626' : '#6b7280',
                color: isError ? '#dc2626' : '#6b7280',
              }}
            >
              Download
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
