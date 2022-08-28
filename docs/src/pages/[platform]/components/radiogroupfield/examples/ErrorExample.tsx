import * as React from 'react';
import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

const options = ['HTML', 'CSS', 'JavaScript'];

export const ErrorExample = () => {
  const [language, setLanguage] = React.useState(null);

  return (
    <RadioGroupField
      label="Language"
      name="example-12"
      onChange={(e) => setLanguage(e.target.value)}
      errorMessage="This is a required field. Please select an option."
      hasError={!language}
      labelHidden
    >
      {options.map((option) => (
        <Radio key={option} value={option}>
          {option}
        </Radio>
      ))}
    </RadioGroupField>
  );
};
