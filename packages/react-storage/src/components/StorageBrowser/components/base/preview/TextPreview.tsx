import React, { useEffect, useState } from 'react';
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
  const { LocationDetailView: displayText } = useDisplayText();
  const {
    filePreview: { emptyFileMessage, textLoadErrorDescription },
  } = displayText;

  async function loadTextFileContent() {
    try {
      if (!url) return;
      setIsLoading(true);
      setError(null);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }

      const textContent = await response.text();
      setContent(textContent);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load file';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  function handleRetry() {
    loadTextFileContent();
  }

  useEffect(() => {
    loadTextFileContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileKey]);

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
