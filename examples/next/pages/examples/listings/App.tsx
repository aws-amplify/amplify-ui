import {
  ToggleButton,
  ToggleButtonGroup,
  AmplifyProvider,
  IconWbSunny,
  IconBedtime,
  IconTonality,
  Icon4k,
  ColorMode,
} from '@aws-amplify/ui-react';
import { useState } from 'react';

import { theme } from '../../../theme';
import { Logo } from './Logo';

import '@aws-amplify/ui-react/styles.css';
import './styles.scss';

export const App = ({ children }) => {
  const [colorMode, setColorMode] = useState<ColorMode>('system');
  return (
    <AmplifyProvider theme={theme} colorMode={colorMode}>
      <header className="listing-app-header">
        <Logo />
        <Icon4k />
        <input type="search" placeholder="search" />
        <ToggleButtonGroup
          value={colorMode}
          isExclusive
          onChange={(value: ColorMode) => setColorMode(value)}
        >
          <ToggleButton value="light">
            <IconWbSunny />
          </ToggleButton>
          <ToggleButton value="dark">
            <IconBedtime />
          </ToggleButton>
          <ToggleButton value="system">
            <IconTonality />
          </ToggleButton>
        </ToggleButtonGroup>
      </header>

      {children}
    </AmplifyProvider>
  );
};

export default App;
