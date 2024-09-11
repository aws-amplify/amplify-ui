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
    <View>
      <HeaderControl />
      <View>
        <AutoHidablePromptControl />
        <MessagesControl />
      </View>
      <View>
        <FieldControl />
      </View>
    </View>
  );
}
