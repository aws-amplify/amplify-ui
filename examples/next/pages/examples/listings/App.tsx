import * as React from 'react';
import {
  ColorMode,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
} from '@aws-amplify/ui-react';
import { MdBedtime, MdTonality, MdWbSunny } from 'react-icons/md';

import { theme } from '../../../theme';
import { Logo } from './Logo';
import './styles.module.scss';

export const App = ({ children }) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <header className="listing-app-header">
        <Logo />
        <input type="search" placeholder="search" className="search-input" />
        <ToggleButtonGroup
          value={colorMode}
          isExclusive
          onChange={(value: ColorMode) => setColorMode(value)}
        >
          <ToggleButton value="light">
            <MdWbSunny />
          </ToggleButton>
          <ToggleButton value="dark">
            <MdBedtime />
          </ToggleButton>
          <ToggleButton value="system">
            <MdTonality />
          </ToggleButton>
        </ToggleButtonGroup>
      </header>

      {children}
    </ThemeProvider>
  );
};

export default App;
