import { Autocomplete, Flex } from '@aws-amplify/ui-react';
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

export const AutocompleteVariationExample = () => (
  <Flex direction="column">
    <Autocomplete label="Autocomplete variation example" options={options} />
    <Autocomplete
      label="Autocomplete variation example"
      options={options}
      variation="quiet"
    />
  </Flex>
);
