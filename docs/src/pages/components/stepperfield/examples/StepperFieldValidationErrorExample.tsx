import { StepperField } from '@aws-amplify/ui-react';

export const StepperFieldValidationErrorExample = () => {
  return (
    <StepperField
      label="Stepper"
      defaultValue={0}
      min={0}
      max={10}
      step={1}
      errorMessage="The is an error message."
      hasError
      labelHidden
    />
  );
};
