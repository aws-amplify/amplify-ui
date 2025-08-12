import React, { useEffect, useState } from 'react';
import { TextElement } from '../../elements';

export function TextPreview({
  url,
  objectKey,
}: {
  url: string | null;
  objectKey: string;
}): React.JSX.Element | null {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    loadTextFileContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [objectKey]);

  if (isLoading) {
    return <div>...text file content</div>;
  }

  if (isLoading) {
    <div>
      <TextElement>Loading file content...</TextElement>
    </div>;
  }

  if (error) {
    return (
      <div>
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
      }}
    >
      {content || 'File is empty'}
    </div>
  );
}
