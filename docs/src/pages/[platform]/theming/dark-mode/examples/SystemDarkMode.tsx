import * as React from 'react';
import {
  defaultDarkModeOverride,
  ThemeProvider,
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
    // Note: color mode overrides are scoped to the ThemeProvider
    // if you use multiple providers
    <ThemeProvider theme={theme} colorMode="system" isNested>
      <Card>
        <Button>Hello</Button>
        <Text variation="primary">Primary text</Text>
        <Text variation="secondary">Secondary text</Text>
        <Text variation="tertiary">Tertiary text</Text>
      </Card>
    </ThemeProvider>
  );
};
