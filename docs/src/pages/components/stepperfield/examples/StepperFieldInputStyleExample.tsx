import { StepperField, useTheme } from '@aws-amplify/ui-react';

export const StepperFieldInputStyleExample = () => {
  const { tokens } = useTheme();
  return (
    <StepperField
      label="Stepper"
      defaultValue={0}
      min={0}
      max={10}
      step={1}
      inputStyles={{
        fontWeight: tokens.fontWeights.extrabold,
        backgroundColor: tokens.colors.background.disabled,
      }}
      labelHidden
    />
  );
};
