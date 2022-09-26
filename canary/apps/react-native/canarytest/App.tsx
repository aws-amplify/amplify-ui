import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {withInAppMessaging} from '@aws-amplify/ui-react-native';

function App() {
  return (
    <View style={styles.container}>
      <Text>Testing 123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withInAppMessaging(App);
