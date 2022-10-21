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
        fontSize="xl"
        padding="large"
        border={`1px solid ${tokens.colors.teal[60]}`}
        borderRadius="0.5rem"
      />
      <StepperField
        label="Stepper"
        defaultValue={0}
        min={0}
        max={10}
        step={1}
        inputStyles={{
          backgroundColor: 'brand.primary.10',
          fontWeight: 'bold',
        }}
      />
    </>
  );
};
