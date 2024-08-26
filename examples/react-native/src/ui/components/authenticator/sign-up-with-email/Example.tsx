import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Authenticator } from '@aws-amplify/ui-react-native';
import { Amplify } from 'aws-amplify';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui';
import { VERSION } from '@env';

import { SignOutButton } from '../SignOutButton';

const AMPLIFY_CONFIG_PATH =
  VERSION === 'gen1' ? 'src/amplifyconfiguration' : 'amplify_outputs';

const amplifyOutputs = require(
  `@aws-amplify/ui-environments/auth/auth-with-email/${AMPLIFY_CONFIG_PATH}`
);

Amplify.configure(amplifyOutputs);
const existingConfig = Amplify.getConfig();
Amplify.configure({
  ...existingConfig,
  Auth: {
    ...existingConfig.Auth,
    // @ts-ignore
    Cognito: {
      ...existingConfig.Auth?.Cognito,
      // mock server endpoint for Detox e2es
      userPoolEndpoint: 'http://127.0.0.1:9091/',
    },
  },
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
