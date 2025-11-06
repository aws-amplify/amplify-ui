import React from 'react';
import type { ColorMode, Theme } from '@aws-amplify/ui-react';
import {
  Card,
  defaultDarkModeOverride,
  Grid,
  ThemeProvider,
} from '@aws-amplify/ui-react';

import '../style.module.css';
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
