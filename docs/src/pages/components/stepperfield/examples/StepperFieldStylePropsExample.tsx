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
      fontWeight={tokens.fontWeights.extrabold}
      padding={tokens.space.large}
      border={`${tokens.borderWidths.large} solid ${tokens.colors.teal[80]}`}
      color={tokens.colors.white}
      labelHidden
    />
  );
};
