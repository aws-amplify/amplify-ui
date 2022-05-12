import * as React from 'react';
import { StepperField } from '@aws-amplify/ui-react';

export const ControlledStepperFieldExample = () => {
  const [value, setValue] = React.useState<number>(0);

  const handleOnStepChange = (newValue: number) => {
    alert(`New value: ${newValue}`);
    setValue(newValue);
  };

  return (
    <StepperField
      label="Controlled stepper"
      value={value}
      onStepChange={handleOnStepChange}
    />
  );
};
