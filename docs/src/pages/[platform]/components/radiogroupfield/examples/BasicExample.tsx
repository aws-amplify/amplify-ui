import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

const options = ['html', 'css', 'javascript'];

export const BasicExample = () => (
  <RadioGroupField label="Language" name="language2" defaultValue="html">
    {options.map((option) => (
      <Radio key={option} value={option}>
        {option}
      </Radio>
    ))}
  </RadioGroupField>
);
