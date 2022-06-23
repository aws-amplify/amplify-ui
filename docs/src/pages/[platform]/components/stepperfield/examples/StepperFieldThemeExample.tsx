import { StepperField, ThemeProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'stepper-theme',
  tokens: {
    components: {
      stepperfield: {
        borderColor: { value: '{colors.brand.secondary.20}' },
        input: {
          color: { value: '{colors.brand.primary.80}' },
          fontSize: { value: '{fontSizes.large}' },
        },
        button: {
          color: { value: '{colors.brand.primary.80}' },
          backgroundColor: { value: '{colors.neutral.20}' },
          _disabled: {
            color: { value: '{colors.brand.primary.80}' },
          },
        },
      },
    },
  },
};

export const StepperFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <StepperField
      label="Themed stepper"
      defaultValue={0}
      min={0}
      max={10}
      step={1}
      labelHidden
    />
  </ThemeProvider>
);
