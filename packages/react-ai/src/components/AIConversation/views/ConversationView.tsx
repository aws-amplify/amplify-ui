import React from 'react';
import { ViewElement as View } from '../context/elements/definitions';
import {
  AutoHidablePromptControl,
  FormControl,
  MessagesControl,
} from './Controls';

export default function Conversation(): JSX.Element {
  return (
    <View>
      <View>
        <AutoHidablePromptControl />
        <MessagesControl />
      </View>
      <View>
        <FormControl />
      </View>
    </View>
  );
}
