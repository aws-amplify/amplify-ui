import { StepperField } from '@aws-amplify/ui-react';

export const DisabledStepperFieldExample = () => {
  return (
    <StepperField
      label="Stepper"
      defaultValue={0}
      min={0}
      max={10}
      step={1}
      labelHidden
      isDisabled
    />
  );
};
