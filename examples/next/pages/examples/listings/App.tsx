import {
  ToggleButton,
  ToggleButtonGroup,
  AmplifyProvider,
  ColorMode,
} from '@aws-amplify/ui-react';
import { MdWbSunny, MdBedtime, MdTonality } from 'react-icons/md';
import * as React from 'react';

import { theme } from '../../../theme';
import { Logo } from './Logo';

import '@aws-amplify/ui-react/styles.css';
import './styles.scss';

export const App = ({ children }) => {
  const [colorMode, setColorMode] = React.useState<ColorMode>('system');
  return (
    <AmplifyProvider theme={theme} colorMode={colorMode}>
      <header className="listing-app-header">
        <Logo />

        <input type="search" placeholder="search" />
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
    </AmplifyProvider>
  );
};

export default App;
