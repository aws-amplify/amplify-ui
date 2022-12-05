import React from 'react';
import { useColorScheme } from 'react-native';

import {
  Authenticator,
  defaultDarkModeOverride,
  ThemeProvider,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import config from './aws-exports';

Amplify.configure(config);

function App() {
  const colorMode = useColorScheme();
  return (
    <ThemeProvider
      colorMode={colorMode}
      theme={{
        tokens: {
          colors: {
            brand: {
              primary: {
                10: '{colors.pink.10}',
                20: '{colors.pink.20}',
                40: '{colors.pink.40}',
                60: '{colors.pink.60}',
                80: '{colors.pink.80}',
                90: '{colors.pink.90}',
                100: '{colors.pink.100}',
              },
            },
          },
        },
        overrides: [defaultDarkModeOverride],
      }}
    >
      <Authenticator.Provider>
        <Authenticator />
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

export default App;
