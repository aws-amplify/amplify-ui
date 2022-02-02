import { StepperField } from '@aws-amplify/ui-react';

export const StepperFieldSizeExample = () => {
  return (
    <>
      <StepperField
        label="Stepper"
        defaultValue={0}
        min={0}
        max={10}
        step={1}
        size="small"
        labelHidden
      />
      <StepperField
        label="Stepper"
        defaultValue={0}
        min={0}
        max={10}
        step={1}
        labelHidden
      />
      <StepperField
        label="Stepper"
        defaultValue={0}
        min={0}
        max={10}
        step={1}
        size="large"
        labelHidden
      />
    </>
  );
};
