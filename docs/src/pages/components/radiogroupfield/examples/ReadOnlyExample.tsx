import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

const options = ['html', 'css', 'javascript'];

export const ReadOnlyExample = () => (
  <RadioGroupField
    label="Language"
    name="example-11"
    defaultValue="html"
    labelHidden
    isReadOnly
  >
    {options.map((option) => (
      <Radio key={option} value={option}>
        {option}
      </Radio>
    ))}
  </RadioGroupField>
);
