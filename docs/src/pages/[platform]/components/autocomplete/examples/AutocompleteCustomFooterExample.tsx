import { Autocomplete, Divider, Flex, Link } from '@aws-amplify/ui-react';
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
    menu={{
      Footer: (
        <Flex direction="column" width="100%">
          <Divider />
          <Link>See more results...</Link>
        </Flex>
      ),
    }}
  />
);
