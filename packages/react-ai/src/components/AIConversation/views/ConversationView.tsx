import React from 'react';
import { ViewElement as View } from '../context/elements/definitions';
import {
  AutoHidablePromptControl,
  HeaderControl,
  FieldControl,
  MessagesControl,
} from './Controls';

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
      <View
        style={{
          borderLeft: '1px solid rgba(220, 222, 224, 1)',
          borderRight: '1px solid rgba(220, 222, 224, 1)',
          padding: '0px 16px',
        }}
      >
        <AutoHidablePromptControl />
        <MessagesControl />
      </View>
      <View
        style={{
          border: '1px solid rgba(220, 222, 224, 1)',
          borderTop: 'none',
          borderRadius: '0px 0px 16px 16px',
          padding: '0px 16px',
        }}
      >
        <FieldControl />
      </View>
    </View>
  );
}
