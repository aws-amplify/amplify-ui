import { CheckboxField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'checkbox-theme',
  tokens: {
    components: {
      checkbox: {
        button: {
          color: { value: '{colors.yellow.40}' },
          _focus: {
            outlineColor: { value: '{colors.blue.40}' },
            borderColor: { value: '{colors.red.40}' },
          },
        },
        icon: {
          backgroundColor: { value: '{colors.secondary.80}' },
        },
        label: {
          color: { value: '{colors.purple.80}' },
          _disabled: {
            color: { value: '{colors.purple.60}' },
          },
        },
      },
    },
  },
};

export const CheckboxFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <CheckboxField label="Subscribe" name="subscribe" />
    <CheckboxField
      label="Disabled example"
      name="disabledExample"
      value="yes"
      isDisabled={true}
    />
  </ThemeProvider>
);
