import { StepperField, useTheme } from '@aws-amplify/ui-react';

export const StepperFieldStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <StepperField
      label="Stepper"
      defaultValue={0}
      min={0}
      max={10}
      step={1}
      backgroundColor={tokens.colors.teal[60]}
      border={`1px solid ${tokens.colors.teal[60]}`}
      color={tokens.colors.white}
      labelHidden
    />
  );
};
