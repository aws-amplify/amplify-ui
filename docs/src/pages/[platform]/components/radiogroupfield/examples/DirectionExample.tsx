import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

const options = ['html', 'css', 'javascript'];

export const DirectionExample = () => (
  <>
    <RadioGroupField
      label="Language"
      name="example-7"
      defaultValue="html"
      labelHidden
    >
      {options.map((option) => (
        <Radio key={option} value={option}>
          {option}
        </Radio>
      ))}
    </RadioGroupField>
    <RadioGroupField
      label="Language"
      name="example-8"
      defaultValue="html"
      direction="row"
      labelHidden
    >
      {options.map((option) => (
        <Radio key={option} value={option}>
          {option}
        </Radio>
      ))}
    </RadioGroupField>
  </>
);
