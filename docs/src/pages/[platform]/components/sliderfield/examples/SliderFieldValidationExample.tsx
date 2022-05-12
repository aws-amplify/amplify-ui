import { SliderField } from '@aws-amplify/ui-react';
import * as React from 'react';

export const SliderFieldValidationExample = () => {
  const [age, setAge] = React.useState(13);

  return (
    <SliderField
      label="Select your age"
      value={age}
      onChange={setAge}
      hasError={age < 18}
      errorMessage="You must be at least 18 years old."
    />
  );
};
