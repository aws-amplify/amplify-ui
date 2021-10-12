import * as React from 'react';
import {
  createTheme,
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
  const theme = createTheme({
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
          },
        },
      },
    ],
  });
  return (
    <AmplifyProvider components={{}} theme={theme} colorMode={colorMode}>
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
