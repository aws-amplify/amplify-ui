import { Autocomplete, Divider, Link, View } from '@aws-amplify/ui-react';
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

export const AutocompleteCustomFooterExample = () => (
  <Autocomplete
    label="Autocomplete custom footer example"
    options={options}
    menuSlots={{
      Footer: (
        <View padding="xxxs">
          <Divider />
          <View>
            <Link>See more results...</Link>
          </View>
        </View>
      ),
    }}
  />
);
