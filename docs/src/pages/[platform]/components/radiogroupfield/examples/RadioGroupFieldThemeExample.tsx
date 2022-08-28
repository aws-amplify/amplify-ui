import { Radio, RadioGroupField, ThemeProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'radiogroup-theme',
  tokens: {
    components: {
      radiogroup: {
        label: {
          color: { value: '{colors.blue.80}' },
        },
        radio: {
          borderWidth: { value: '{borderWidths.small}' },
          borderColor: { value: '{colors.blue.60}' },
          backgroundColor: { value: '{colors.blue.20}' },
          _checked: {
            color: { value: '{colors.blue.80}' },
          },
          label: {
            color: { value: '{colors.blue.80}' },
          },
        },
      },
    },
  },
};

export const RadioGroupFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <RadioGroupField label="Themed example" name="themed" defaultValue="blue">
      <Radio value="blue">Blue</Radio>
      <Radio value="navy">Navy</Radio>
      <Radio value="cerulean">Cerulean</Radio>
    </RadioGroupField>
  </ThemeProvider>
);
