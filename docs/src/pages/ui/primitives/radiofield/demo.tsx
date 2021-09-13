import { useState } from 'react';

import { Radio, RadioField, View } from '@aws-amplify/ui-react';

import { RadioFieldPropControls } from '@/components/RadioFieldPropControls';
import { useRadioFieldProps } from '@/components/useRadioFieldProps';

export const Demo = () => {
  const props = useRadioFieldProps({
    label: 'Language',
    name: 'language',
    defaultValue: 'html',
  });
  return (
    <View>
      <RadioFieldPropControls {...props} />
      <RadioField className="mt-10" {...props}>
        <Radio value="html">html</Radio>
        <Radio value="css">css</Radio>
        <Radio value="javascript">javascript</Radio>
      </RadioField>
    </View>
  );
};

export const ControlledRadioField = () => {
  const [value, setValue] = useState('html');
  return (
    <RadioField
      label="Language"
      name="example-2"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      labelHidden
    >
      <Radio value="html">html</Radio>
      <Radio value="css">css</Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioField>
  );
};
