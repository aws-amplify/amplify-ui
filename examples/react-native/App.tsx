import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Greeting } from '@env';

const App = () => {
  return (
    <View style={style.container}>
      <Text>{Greeting}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
