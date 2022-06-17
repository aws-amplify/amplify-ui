import * as React from 'react';
import {
  defaultDarkModeOverride,
  ThemeProvider,
  Card,
  Text,
  ToggleButton,
  ToggleButtonGroup,
} from '@aws-amplify/ui-react';

export const DefaultDarkMode = () => {
  const [colorMode, setColorMode] = React.useState('system');
  const theme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
  };

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <Card>
        <ToggleButtonGroup
          value={colorMode}
          isExclusive
          onChange={(value) => setColorMode(value)}
        >
          <ToggleButton value="light">Light</ToggleButton>
          <ToggleButton value="dark">Dark</ToggleButton>
          <ToggleButton value="system">System</ToggleButton>
        </ToggleButtonGroup>
        <Text>Current color mode: {colorMode}</Text>
      </Card>
    </ThemeProvider>
  );
};
