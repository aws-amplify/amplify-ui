import { Autocomplete, Divider, View } from '@aws-amplify/ui-react';
import * as React from 'react';

const options = [
  { id: 'apple', label: 'apple' },
  { id: 'banana', label: 'banana' },
  { id: 'cherry', label: 'cherry' },
  { id: 'grape', label: 'grape' },
  { id: 'kiwis', label: 'kiwis' },
  { id: 'lemon', label: 'lemon' },
  { id: 'mango', label: 'mango' },
  { id: 'orange', label: 'orange' },
  { id: 'strawberry', label: 'strawberry' },
];

export const AutocompleteCustomHeaderExample = () => (
  <Autocomplete
    label="Autocomplete custom header example"
    options={options}
    menuSlots={{
      Header: (
        <View padding="xxxs">
          <View>Search results:</View>
          <Divider />
        </View>
      ),
    }}
  />
);
