import { StepperField, useTheme } from '@aws-amplify/ui-react';

export const StepperFieldStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <StepperField
        label="Stepper"
        defaultValue={0}
        min={0}
        max={10}
        step={1}
        padding="large"
        border={`1px solid ${tokens.colors.brand.primary[60]}`}
      />
      <StepperField
        label="Stepper"
        defaultValue={0}
        min={0}
        max={10}
        step={1}
        inputStyles={{
          backgroundColor: 'brand.primary.10',
        }}
      />
    </>
  );
};
