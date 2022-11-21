import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { Button } from '../../../ui';

Amplify.configure({});

const MyHeader = ({
  children,
  style,
}: {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) => (
  <View style={style}>
    <Text style={{ fontSize: 36 }}>{children}</Text>
  </View>
);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut}>Sign Out</Button>;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator
        components={{
          SignIn: (props) => (
            <Authenticator.SignIn {...props} Header={MyHeader} />
          ),
        }}
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
