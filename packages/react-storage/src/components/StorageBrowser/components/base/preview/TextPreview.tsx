import React, { useCallback, useEffect, useState } from 'react';
import { ViewElement } from '../../elements';
import { STORAGE_BROWSER_BLOCK } from '../constants';
import { useDisplayText } from '../../../displayText';
import { PreviewFallback } from './PreviewFallback';
import { PreviewPlaceholder } from './PreviewPlaceholder';

export function TextPreview({
  url,
  fileKey,
}: {
  url: string;
  fileKey: string;
}): React.JSX.Element {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: { emptyFileMessage, textLoadErrorDescription },
  } = displayText;

  const handleRetry = useCallback(() => {
    setRetryCount((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();

    async function loadTextFileContent() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const textContent = await response.text();
        setContent(textContent);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          const errorMessage = err.message || 'Failed to load file';
          setError(errorMessage);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadTextFileContent();

    return () => {
      controller.abort();
    };
  }, [url, fileKey, retryCount]);

  if (isLoading) {
    return <PreviewPlaceholder />;
  }

  if (error) {
    return (
      <PreviewFallback
        fileKey={fileKey}
        message={error}
        description={textLoadErrorDescription}
        isError
        onRetry={handleRetry}
        showRetry
      />
    );
  }

  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__text-preview`}>
      {content || emptyFileMessage}
    </ViewElement>
  );
}
