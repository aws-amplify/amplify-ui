import React from 'react';
import { ViewElement as View } from '../context/elements/definitions';
import { HeaderControl, FormControl, MessagesControl } from './Controls';

export default function Conversation(): JSX.Element {
  return (
    <View
      style={{
        width: '584px',
        height: 'auto',
        maxHeight: '80%',
      }}
    >
      <HeaderControl />
      <MessagesControl />
      <FormControl />
    </View>
  );
}
