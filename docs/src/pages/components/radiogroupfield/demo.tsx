import * as React from 'react';
import { Radio, RadioGroupField, View } from '@aws-amplify/ui-react';

import { RadioGroupFieldPropControls } from '@/components/RadioGroupFieldPropControls';
import { useRadioGroupFieldProps } from '@/components/useRadioGroupFieldProps';

export const Demo = () => {
  const props = useRadioGroupFieldProps({
    label: 'Language',
    name: 'language',
    defaultValue: 'html',
  });
  return (
    <View>
      <RadioGroupFieldPropControls {...props} />
      <RadioGroupField className="mt-10" {...props}>
        <Radio value="html">html</Radio>
        <Radio value="css">css</Radio>
        <Radio value="javascript">javascript</Radio>
      </RadioGroupField>
    </View>
  );
};

export const ControlledRadioGroupField = () => {
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
