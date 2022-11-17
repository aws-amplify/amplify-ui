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

export const AutocompleteSizeExample = () => (
  <Flex direction="column">
    <Autocomplete
      label="Autocomplete size example"
      options={options}
      size="small"
    />
    <Autocomplete label="Autocomplete size example" options={options} />
    <Autocomplete
      label="Autocomplete size example"
      options={options}
      size="large"
    />
  </Flex>
);
