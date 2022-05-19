import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

const options = ['html', 'css', 'javascript'];

export const ErrorExample = () => (
  <RadioGroupField
    label="Language"
    name="example-12"
    errorMessage="This is a required field."
    hasError
    labelHidden
  >
    {options.map((option) => (
      <Radio key={option} value={option}>
        {option}
      </Radio>
    ))}
  </RadioGroupField>
);
