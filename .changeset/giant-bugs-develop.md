---
"@aws-amplify/ui-react": minor
"@aws-amplify/ui": minor
---

feat: add autocomplete support for SearchField


**Example**


```jsx
// Uncontrolled way
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
    />
  );
};

```

```jsx
// Controlled way
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

export const ControlledAutocompleteExample = () => {
  const [value, setValue] = React.useState('');

  const handleOnChange = (event) => {
    setValue(event.target.value);
  };

  const handleOnSuggestionSelect = (suggestion) => {
    const { label } = suggestion;
    setValue(label);
  };

  const handleOnClear = () => {
    setValue('');
  };

  return (
    <SearchField
      label="Uncontrolled autocomplete"
      placeholder="Search..."
      suggestions={suggestions}
      value={value}
      onChange={handleOnChange}
      onClear={handleOnClear}
      onSuggestionSelect={handleOnSuggestionSelect}
    />
  );
};
```
