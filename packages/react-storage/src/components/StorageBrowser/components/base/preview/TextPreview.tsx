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

  return <div>{content || 'File is empty'}</div>;
}
