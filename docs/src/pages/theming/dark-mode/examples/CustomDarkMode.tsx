import * as React from 'react';
import {
  Theme,
  defaultTheme,
  AmplifyProvider,
  ColorMode,
  Card,
  Text,
  ToggleButton,
  ToggleButtonGroup,
} from '@aws-amplify/ui-react';

export const CustomDarkModeExample = () => {
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const theme: Theme = {
    name: 'my-theme',
    overrides: [
      {
        colorMode: 'dark',
        tokens: {
          colors: {
            font: {
              primary: { value: '{colors.white}' },
              secondary: { value: '{colors.neutral.10}' },
              tertiary: { value: '{colors.neutral.20}' },
            },
            background: {
              primary: { value: '{colors.neutral.100}' },
              secondary: { value: '{colors.neutral.90}' },
              tertiary: { value: '{colors.neutral.80}' },
            },
            border: {
              primary: { value: '{colors.neutral.60}' },
              secondary: { value: '{colors.neutral.40}' },
              tertiary: { value: '{colors.neutral.20}' },
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
