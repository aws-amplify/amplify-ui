'use client';

import { Autocomplete, Flex } from '@aws-amplify/ui-react';

export default function AutocompletePage() {
  return (
    <Flex direction="column">
      <Autocomplete
        label="Autocomplete"
        options={[
          { id: 'apple', label: 'apple' },
          { id: 'banana', label: 'banana' },
          { id: 'cherry', label: 'cherry' },
          { id: 'grape', label: 'grape' },
          { id: 'kiwis', label: 'kiwis' },
          { id: 'lemon', label: 'lemon' },
          { id: 'mango', label: 'mango' },
          { id: 'orange', label: 'orange' },
          { id: 'strawberry', label: 'strawberry' },
        ]}
        placeholder="Search here..."
      />
    </Flex>
  );
}
