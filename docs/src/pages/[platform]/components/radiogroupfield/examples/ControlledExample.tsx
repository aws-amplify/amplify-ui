import * as React from 'react';
import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const ControlledExample = () => {
  const [value, setValue] = React.useState('apple');

  return (
    <RadioGroupField
      label="Fruit"
      name="fruit"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <Radio value="apple">🍎</Radio>
      <Radio value="banana">🍌</Radio>
      <Radio value="carrot">🥕</Radio>
    </RadioGroupField>
  );
};
