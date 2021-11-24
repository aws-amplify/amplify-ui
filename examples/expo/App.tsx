import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as Authenticator from '@aws-amplify/ui-react-native';

console.log({ Authenticator });

function App() {
  return (
    <View style={styles.container}>
      <Text>Howdy World</Text>
      {/* <Authenticator>{() => <Text>Logged In</Text>}</Authenticator> */}
      <StatusBar style="auto" />
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
