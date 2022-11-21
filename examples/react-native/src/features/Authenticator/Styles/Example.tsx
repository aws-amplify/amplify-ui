import React, { ReactNode } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import {
  Authenticator,
  useAuthenticator,
  defaultDarkModeOverride,
  ThemeProvider,
  Theme,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { Button } from '../../../ui';

Amplify.configure({});

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut}>Sign Out</Button>;
}

const theme: Theme = {
  overrides: [defaultDarkModeOverride],
};

function App() {
  const colorMode = useColorScheme();
  return (
    <ThemeProvider theme={theme} colorMode={colorMode}>
      <Authenticator.Provider>
        <Authenticator>
          <View style={style.container}>
            <SignOutButton />
          </View>
        </Authenticator>
      </Authenticator.Provider>
    </ThemeProvider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
