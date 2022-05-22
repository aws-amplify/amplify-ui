import * as React from 'react';
import { SelectField } from '@aws-amplify/ui-react';

export const SelectFieldControlledExample = () => {
  const [value, setValue] = React.useState('');

  return (
    <SelectField
      label="Fruit"
      labelHidden
      placeholder="This SelectField is manually controlled"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="x">X</option>
      <option value="y">Y</option>
      <option value="z">Z</option>
    </SelectField>
  );
};
