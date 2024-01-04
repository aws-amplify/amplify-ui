import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  Authenticator,
  AuthenticatorProps,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { SignOutButton } from '../SignOutButton';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function Header() {
  return <Text>Enter Information:</Text>;
}
function Footer() {
  return <Text>Footer Information</Text>;
}

const components: AuthenticatorProps['components'] = {
  SignIn: ({ fields, ...props }) => {
    const [username, password] = fields;
    return (
      <Authenticator.SignIn
        {...props}
        fields={[
          { ...username, placeholder: 'Enter your cool email' },
          password,
        ]}
      />
    );
  },
  VerifyUser: (props) => (
    <Authenticator.VerifyUser {...props} Header={Header} Footer={Footer} />
  ),
  ConfirmVerifyUser: (props) => (
    <Authenticator.ConfirmVerifyUser
      {...props}
      fields={[
        {
          type: 'default',
          name: 'confirmation_code',
          label: 'New Label',
          placeholder: 'Enter your Confirmation Code:',
          required: false,
        },
      ]}
      Header={Header}
      Footer={Footer}
    />
  ),
};

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator components={components}>
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
