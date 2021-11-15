import {
  ToggleButton,
  ToggleButtonGroup,
  AmplifyProvider,
  IconLightMode,
  IconDarkMode,
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
    <AmplifyProvider components={{}} theme={theme} colorMode={colorMode}>
      <header className="listing-app-header">
        <Logo />

        <input type="search" placeholder="search" />
        <ToggleButtonGroup
          value={colorMode}
          isExclusive
          onChange={(value: ColorMode) => setColorMode(value)}
        >
          <ToggleButton value="light">
            <IconLightMode />
          </ToggleButton>
          <ToggleButton value="dark">
            <IconDarkMode />
          </ToggleButton>
          <ToggleButton value="system">
            <IconLightMode />
          </ToggleButton>
        </ToggleButtonGroup>
      </header>

      {children}
    </AmplifyProvider>
  );
};

export default App;
