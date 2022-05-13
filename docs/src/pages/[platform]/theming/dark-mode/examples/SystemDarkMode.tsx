import * as React from 'react';
import {
  defaultDarkModeOverride,
  AmplifyProvider,
  Card,
  Text,
  Button,
} from '@aws-amplify/ui-react';

export const SystemDarkModeExample = () => {
  const theme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
  };

  return (
    // Note: color mode overrides are scoped to the AmplifyProvider
    // if you use multiple providers
    <AmplifyProvider theme={theme} colorMode="system">
      <Card>
        <Button>Hello</Button>
        <Text variation="primary">Primary text</Text>
        <Text variation="secondary">Secondary text</Text>
        <Text variation="tertiary">Tertiary text</Text>
      </Card>
    </AmplifyProvider>
  );
};
