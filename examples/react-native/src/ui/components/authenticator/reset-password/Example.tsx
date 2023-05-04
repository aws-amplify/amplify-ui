import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify, I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui';

import { SignOutButton } from '../SignOutButton';
import awsconfig from './aws-exports';

Amplify.configure({
  ...awsconfig,
  Auth: { endpoint: 'http://127.0.0.1:9091/' },
});

I18n.putVocabularies(translations);
I18n.setLanguage('en');
I18n.putVocabulariesForLanguage('en', {
  'Enter your username': 'Enter your Username',
});

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator initialState="resetPassword">
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
