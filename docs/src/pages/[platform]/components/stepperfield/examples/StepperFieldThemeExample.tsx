import { StepperField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'stepperfield-theme',
  tokens: {
    components: {
      stepperfield: {
        // TODO: customize here
      },
      // any more subcomponents?
    },
  },
};

export const StepperFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
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
