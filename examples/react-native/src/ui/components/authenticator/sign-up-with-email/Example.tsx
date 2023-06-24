import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify, I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui';

import { SignOutButton } from '../SignOutButton';
import awsconfig from './aws-exports';

Amplify.configure({
  ...awsconfig,
  // mock server endpoint for Detox e2es
  Auth: { endpoint: 'http://127.0.0.1:9091/' },
});

I18n.putVocabularies(translations);
I18n.setLanguage('en');
I18n.putVocabulariesForLanguage('en', {
  'Enter your code': 'Enter the code given',
  'It may take a minute to arrive': 'It will take several minutes to arrive',
});

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator initialState="signUp">
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
