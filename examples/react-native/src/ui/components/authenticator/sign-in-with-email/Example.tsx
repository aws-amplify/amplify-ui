import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  Authenticator,
  AuthenticatorProps,
} from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { SignOutButton } from '../SignOutButton';
import { VERSION } from '@env';

const AMPLIFY_CONFIG_PATH =
  VERSION === 'gen1' ? 'src/amplifyconfiguration' : 'amplify_outputs';

const amplifyOutputs = require(
  `@aws-amplify/ui-environments/auth/auth-with-email/${AMPLIFY_CONFIG_PATH}`
);

Amplify.configure(amplifyOutputs);

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
          {
            ...username,
            label: 'Enter your cool email',
            testID: 'authenticator__text-field__input-email',
          },
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
