import * as React from 'react';
import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

const options = ['html', 'css', 'javascript'];

export const ControlledExample = () => {
  const [value, setValue] = React.useState('html');
  return (
    <RadioGroupField
      label="Language"
      name="example-2"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      labelHidden
    >
      {options.map((option) => (
        <Radio key={option} value={option}>
          {option}
        </Radio>
      ))}
    </RadioGroupField>
  );
};
