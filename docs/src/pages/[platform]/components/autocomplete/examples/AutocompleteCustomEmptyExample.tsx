import { Autocomplete, View } from '@aws-amplify/ui-react';
import * as React from 'react';

export const AutocompleteCustomEmptyExample = () => (
  <Autocomplete
    label="Autocomplete custom empty example"
    options={[]}
    menu={{
      Empty: <View>No results found :(</View>,
    }}
  />
);
