import { StepperField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'stepper-theme',
  tokens: {
    components: {
      stepperfield: {
        borderColor: { value: '{colors.brand.secondary.40}' },
        input: {
          color: { value: '{colors.brand.primary.60}' },
          fontSize: { value: '{fontSizes.large}' },
        },
        button: {
          color: { value: '{colors.brand.primary.60}' },
          backgroundColor: { value: '{colors.neutral.20}' },
          _disabled: {
            color: { value: '{colors.brand.primary.80}' },
          },
        },
      },
    },
  },
};

export const StepperFieldThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <StepperField
        label="Stepper"
        defaultValue={0}
        min={0}
        max={10}
        step={1}
      />
    </ThemeProvider>
  );
};
