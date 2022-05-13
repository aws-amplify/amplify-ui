import * as React from 'react';
import {
  AmplifyProvider,
  ColorMode,
  Card,
  Text,
  ToggleButton,
  ToggleButtonGroup,
} from '@aws-amplify/ui-react';

export const CustomDarkModeExample = () => {
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const theme = {
    name: 'my-theme',
    overrides: [
      {
        colorMode: 'dark',
        tokens: {
          colors: {
            font: {
              primary: { value: '{colors.pink.100}' },
              secondary: { value: '{colors.pink.90}' },
              tertiary: { value: '{colors.pink.80}' },
            },
            background: {
              primary: { value: '{colors.purple.10}' },
              secondary: { value: '{colors.purple.20}' },
              tertiary: { value: '{colors.purple.40}' },
            },
            border: {
              primary: { value: '{colors.pink.60}' },
              secondary: { value: '{colors.pink.40}' },
              tertiary: { value: '{colors.pink.20}' },
            },
          },
        },
      },
    ],
  };

  return (
    // Note: color mode overrides are scoped to the AmplifyProvider
    // if you use multiple providers
    <AmplifyProvider theme={theme} colorMode={colorMode}>
      <Card>
        <ToggleButtonGroup
          value={colorMode}
          isExclusive
          onChange={(value: ColorMode) => setColorMode(value)}
        >
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
          <ToggleButton value="system">System</ToggleButton>
        </ToggleButtonGroup>
        <Text>Current color mode: {colorMode}</Text>
      </Card>
    </AmplifyProvider>
  );
};
