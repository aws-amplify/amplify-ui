---
"@aws-amplify/ui-react": minor
"@aws-amplify/ui": minor
---

feat: add Autocomplete primitive

**Example**

```jsx
// Uncontrolled component
import { Autocomplete } from '@aws-amplify/ui-react';
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

export const AutocompleteUncontrolledExample = () => {
  return (
    <Autocomplete
      label="Uncontrolled autocomplete"
      options={options}
    />
  );
};
```

```jsx
// Controlled component
import { Autocomplete } from '@aws-amplify/ui-react';
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

export const AutocompleteControlledExample = () => {
  const [value, setValue] = React.useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  // Set up onSelect
  const onSelect = (option) => {
    const { label } = option;
    setValue(label);
  };

  // Set up onClear
  const onClear = () => {
    setValue('');
  };

  return (
    <Autocomplete
      label="Controlled autocomplete"
      options={options}
      value={value}
      onChange={onChange}
      onClear={onClear}
      onSelect={onSelect}
    />
  );
};
```
