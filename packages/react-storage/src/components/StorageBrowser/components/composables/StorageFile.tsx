import React, { useState, useEffect } from 'react';
import { getUrl } from 'aws-amplify/storage';
import { TextElement } from '../elements';

export interface StorageFileProps {
  path: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: (error: Error) => void;
  onLoad?: () => void;
  maxSize?: number; // Maximum file size to preview (in bytes)
  loadingElement?: React.ReactNode;
}

const DEFAULT_MAX_SIZE = 1024 * 1024; // 1MB

export const StorageFile: React.FC<StorageFileProps> = ({
  path,
  className,
  style,
  onError,
  onLoad,
  maxSize = DEFAULT_MAX_SIZE,
  loadingElement,
}) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTextFile = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get the presigned URL
        const { url } = await getUrl({
          path,
          options: {
            validateObjectExistence: true,
          },
        });

        // Fetch the file content
        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        // Check file size
        const contentLength = response.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > maxSize) {
          throw new Error(
            `File too large (${contentLength} bytes). Maximum size: ${maxSize} bytes`
          );
        }

        const textContent = await response.text();
        setContent(textContent);
        onLoad?.();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to load file';
        setError(errorMessage);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
      } finally {
        setIsLoading(false);
      }
    };

    if (path) {
      loadTextFile();
    }
  }, [path, maxSize, onError, onLoad]);

  if (isLoading) {
    return loadingElement ? (
      <>{loadingElement}</>
    ) : (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <TextElement>Loading file content...</TextElement>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          textAlign: 'center',
          ...style,
        }}
        className={className}
      >
        <TextElement>Error loading file: {error}</TextElement>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '16px',
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
        fontSize: '14px',
        lineHeight: '1.5',
        maxHeight: '400px',
        overflow: 'auto',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        ...style,
      }}
      className={className}
    >
      {content || 'File is empty'}
    </div>
  );
};
