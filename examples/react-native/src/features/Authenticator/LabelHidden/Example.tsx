import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';

// replace with actual amplify config from environments
// import config from '../../../aws-exports';

Amplify.configure({});

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut} title="Sign Out" />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator
        components={{
          SignIn: ({ fields, ...props }) => (
            <Authenticator.SignIn
              {...props}
              fields={fields.map((field) => ({ ...field, labelHidden: true }))}
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
