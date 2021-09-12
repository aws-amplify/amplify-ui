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
