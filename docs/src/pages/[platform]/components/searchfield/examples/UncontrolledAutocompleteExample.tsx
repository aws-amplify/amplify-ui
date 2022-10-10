import { SearchField } from '@aws-amplify/ui-react';
import * as React from 'react';

const suggestions = [
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

export const UncontrolledAutocompleteExample = () => {
  return (
    <SearchField
      label="Uncontrolled autocomplete"
      placeholder="Search..."
      suggestions={suggestions}
      hasSearchIcon
      hasSearchButton={false}
    />
  );
};
