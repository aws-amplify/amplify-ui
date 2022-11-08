import { SearchField } from '@aws-amplify/ui-react';
import * as React from 'react';

export const SearchFieldControlledExample = () => {
  const [value, setValue] = React.useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  // It is your responsibility to set up onClear
  const onClear = () => {
    setValue('');
  };

  return (
    <SearchField
      label="search"
      onChange={onChange}
      onClear={onClear}
      value={value}
    />
  );
};
