import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HelloWorld } from '@aws-amplify/ui-react-native';

const App = () => {
  return (
    <View style={style.container}>
      <HelloWorld />
    </View>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
