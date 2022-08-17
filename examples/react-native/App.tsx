import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { withInAppMessaging } from '@aws-amplify/ui-react-native';

const App = () => {
  return (
    <View style={style.container}>
      <Text>Hello World!</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default withInAppMessaging(App);
