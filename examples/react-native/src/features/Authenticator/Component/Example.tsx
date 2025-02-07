import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput } from 'react-native';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import type { DefaultSignInProps } from '@aws-amplify/ui-react-native/dist/Authenticator/Defaults/types';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

const MySignIn = (props: DefaultSignInProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginPress = () => {
    try {
      props.handleSubmit({
        username: email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      <TextInput onChangeText={setEmail} value={email}/>
      <TextInput onChangeText={setPassword} value={password}/>
      <Button onPress={onLoginPress} title="Login" />
    </View>
  );
};

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator
        // render override SignIn subcomponent
        components={{ SignIn: props => <MySignIn {...props} /> }}
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
