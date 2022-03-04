import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const ReadOnlyExample = () => (
  <>
    <RadioGroupField
      label="Language"
      name="example-11"
      defaultValue="html"
      labelHidden
      isReadOnly
    >
      <Radio value="html">html</Radio>
      <Radio value="css">css</Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>
  </>
);
