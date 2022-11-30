import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const MySignInFooter = () => <Text>My Footer</Text>;

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator
        components={{
          SignUp: (props) => (
            // will render only on the SignIn subcomponent
            <Authenticator.SignUp {...props} Footer={MySignInFooter} />
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
