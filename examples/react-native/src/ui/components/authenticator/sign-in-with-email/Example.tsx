import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

import { SignOutButton } from '../SignOutButton';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const components = {
  Header() {
    return <Text>Enter Information:</Text>;
  },
  Footer() {
    return <Text>Footer Information</Text>;
  },
};

const fields = [
  {
    type: 'default' as const,
    name: 'confirmation_code',
    label: 'New Label',
    placeholder: 'Enter your Confirmation Code:',
    required: false,
  },
];

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator
        components={{
          VerifyUser: (props) => (
            <Authenticator.VerifyUser
              {...props}
              Header={components.Header}
              Footer={components.Footer}
            />
          ),
          ConfirmVerifyUser: (props) => (
            <Authenticator.ConfirmVerifyUser
              {...props}
              fields={fields}
              Header={components.Header}
              Footer={components.Footer}
            />
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
