'use client';

import { Alert, Rating } from '@aws-amplify/ui-react';
import { Card, CheckboxField, Flex, Text } from '@aws-amplify/ui-react';

export default function CardPage() {
  return (
    <Flex direction="column" gap="1rem">
      <Alert variation="success">Success</Alert>
      <Alert variation="info">Info</Alert>
      <Alert>Default</Alert>
      <Alert variation="warning">Warning</Alert>

      <Card>
        <Text>Test</Text>
      </Card>

      <Card variation="outlined">
        <Text>Test</Text>
      </Card>

      <Card variation="elevated">
        <Text>Test</Text>
      </Card>

      <Card variation="custom">
        <Text>Test</Text>
      </Card>
      <CheckboxField name="test" label="test" />
      <Rating value={3.5} />
    </Flex>
  );
}
