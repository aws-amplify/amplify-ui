import * as React from 'react';
import { Card, Text } from '@aws-amplify/ui-react';

export const BasicExample = () => (
  // Example using component variations
  <Card variation="outlined">
    {/* Example using color tokens */}
    <Text color="purple.80">Themed purple text</Text>
  </Card>
);
