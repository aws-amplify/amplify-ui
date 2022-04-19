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

export const DarkModeExample = () => {
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const theme: Theme = {
    name: 'dark-mode-theme',
    overrides: [
      {
        colorMode: 'dark',
        tokens: {
          colors: {
            neutral: {
              // flipping the neutral palette
              10: defaultTheme.tokens.colors.neutral[100],
              20: defaultTheme.tokens.colors.neutral[90],
              40: defaultTheme.tokens.colors.neutral[80],
              80: defaultTheme.tokens.colors.neutral[40],
              90: defaultTheme.tokens.colors.neutral[20],
              100: defaultTheme.tokens.colors.neutral[10],
            },
            black: { value: '#fff' },
            white: { value: '#000' },
            overlay: {
              10: { value: 'hsla(0, 0%, 100%, 0.1)' },
              20: { value: 'hsla(0, 0%, 100%, 0.2)' },
              30: { value: 'hsla(0, 0%, 100%, 0.3)' },
              40: { value: 'hsla(0, 0%, 100%, 0.4)' },
              50: { value: 'hsla(0, 0%, 100%, 0.5)' },
              60: { value: 'hsla(0, 0%, 100%, 0.6)' },
              70: { value: 'hsla(0, 0%, 100%, 0.7)' },
              80: { value: 'hsla(0, 0%, 100%, 0.8)' },
              90: { value: 'hsla(0, 0%, 100%, 0.9)' },
            },
          },
        },
      },
    ],
  };

  return (
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
