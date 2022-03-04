import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

export const ErrorExample = () => (
  <RadioGroupField
    label="Language"
    name="example-12"
    errorMessage="This is a required field."
    hasError
    labelHidden
  >
    <Radio value="html">html</Radio>
    <Radio value="css">css</Radio>
    <Radio value="javascript">javascript</Radio>
  </RadioGroupField>
);
