import React from 'react';
import { Button, Card, Flex, Text } from '@aws-amplify/ui-react';

export default function CustomFilePreview({
  filePreviewState,
  onCloseFilePreview,
}) {
  const { previewedFile, url, isLoading, hasError } = filePreviewState;
  const { key, size } = previewedFile || {};

  if (!previewedFile) return null;

  if (isLoading) return <div>...loading</div>;
  if (hasError) return <div>...oops some thing bad happens</div>;

  return (
    <Card padding="1rem" margin="1rem">
      <Flex direction="column" gap="0.5rem">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="large" fontWeight="bold">
            Custom Preview: {key}
          </Text>
          <Button size="small" onClick={onCloseFilePreview}>
            Close
          </Button>
        </Flex>

        <Text color="gray">Size: {size} bytes</Text>

        {url ? (
          <Text color="green">✓ Preview URL ready</Text>
        ) : (
          <Text color="orange">⏳ Loading preview...</Text>
        )}
      </Flex>
    </Card>
  );
}
