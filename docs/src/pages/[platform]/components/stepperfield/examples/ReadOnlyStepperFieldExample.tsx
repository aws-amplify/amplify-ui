import { StepperField } from '@aws-amplify/ui-react';

export const ReadOnlyStepperFieldExample = () => {
  return (
    <StepperField
      label="Stepper"
      defaultValue={5}
      min={0}
      max={10}
      step={1}
      labelHidden
      isReadOnly
    />
  );
};
