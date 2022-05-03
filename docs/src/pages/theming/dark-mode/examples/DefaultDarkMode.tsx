import * as React from 'react';
import {
  Theme,
  defaultDarkMode,
  AmplifyProvider,
  ColorMode,
  Card,
  Text,
  ToggleButton,
  ToggleButtonGroup,
} from '@aws-amplify/ui-react';

export const DefaultDarkMode = () => {
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const theme: Theme = {
    name: 'my-theme',
    overrides: [defaultDarkMode],
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
