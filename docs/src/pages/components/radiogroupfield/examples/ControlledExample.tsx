import * as React from 'react';
import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

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
      <Radio value="html">html</Radio>
      <Radio value="css">css</Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>
  );
};
