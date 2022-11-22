import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import {
  Authenticator,
  useAuthenticator,
  useTheme,
} from '@aws-amplify/ui-react-native';

Amplify.configure({});

const MyHeader = () => {
  const {
    tokens: { space, fontSizes },
  } = useTheme();
  return (
    <View>
      <Text style={{ fontSize: fontSizes.xxxl, padding: space.xl }}>
        My Header
      </Text>
    </View>
  );
};

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

function App() {
  const {
    tokens: { colors },
  } = useTheme();

  return (
    <Authenticator.Provider>
      <Authenticator
        Container={(props) => (
          <Authenticator.Container
            {...props}
            style={{ backgroundColor: colors.pink[20] }}
          />
        )}
        Header={MyHeader}
      >
        <View style={style.container}>
          <SignOutButton />
        </View>
      </Authenticator>
    </Authenticator.Provider>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
