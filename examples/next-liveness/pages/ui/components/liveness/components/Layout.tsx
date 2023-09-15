import React from 'react';
import {
  ThemeProvider,
  Grid,
  Card,
  defaultDarkModeOverride,
} from '@aws-amplify/ui-react';
import type { Theme, ColorMode } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react-liveness/styles.css';

import '../style.css';
import NavBar from './NavBar';

export default function Layout({ children }) {
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  const [navOpen, toggleNavOpen] = React.useState(false);

  const theme: Theme = {
    name: 'liveness-theme',
    overrides: [defaultDarkModeOverride],
  };

  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <Grid height="100%" templateRows="auto 1fr">
        <NavBar
          navOpen={navOpen}
          handleNav={() => toggleNavOpen(!navOpen)}
          colorMode={colorMode}
          setColorMode={setColorMode}
        ></NavBar>
        <Card>{children}</Card>
      </Grid>
    </ThemeProvider>
  );
}
