import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const SizeExample = () => (
  <>
    <RadioGroupField
      label="Language"
      name="example-4"
      defaultValue="html"
      size="small"
      labelHidden
    >
      <Radio value="html">html</Radio>
    </RadioGroupField>
    <RadioGroupField
      label="Language"
      name="example-5"
      defaultValue="css"
      labelHidden
    >
      <Radio value="css">css</Radio>
    </RadioGroupField>
    <RadioGroupField
      label="Language"
      name="example-6"
      defaultValue="javascript"
      size="large"
      labelHidden
    >
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>
  </>
);
