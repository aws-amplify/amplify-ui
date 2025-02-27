import React from 'react';
import { Button, StyleSheet, useColorScheme, View } from 'react-native';
import {
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
  PaperProvider,
  useTheme,
} from 'react-native-paper';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import outputs from '@aws-amplify/ui-environments/auth/gen2/auth-with-federated-sign-in-react-native/amplify_outputs.json';

import SignIn from './SignIn';

Amplify.configure(outputs);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

function Container(
  props: React.ComponentProps<typeof Authenticator.Container>
) {
  const theme = useTheme();
  return (
    <Authenticator.Container
      {...props}
      style={[props?.style, { backgroundColor: theme.colors.background }]}
    />
  );
}
// 9292929
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PaperProvider theme={isDarkMode ? DarkTheme : LightTheme}>
      <Authenticator.Provider>
        <Authenticator Container={Container} components={{ SignIn }}>
          <View style={style.container}>
            <SignOutButton />
          </View>
        </Authenticator>
      </Authenticator.Provider>
    </PaperProvider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
