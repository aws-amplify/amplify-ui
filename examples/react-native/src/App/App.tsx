import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GREETING } from '@env';

function App() {
  return (
    <View style={style.container}>
      <Text>{GREETING}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default App;
