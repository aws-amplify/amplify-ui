import { Radio, RadioGroupField, ThemeProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'radiogroup-theme',
  tokens: {
    components: {
      radiogroup: {
        label: {
          color: { value: '{colors.brand.secondary.80}' },
        },
        radio: {
          borderWidth: { value: '{borderWidths.small}' },
          borderColor: { value: '{colors.brand.secondary.60}' },
          backgroundColor: { value: '{colors.brand.secondary.10}' },
          _checked: {
            color: { value: '{colors.brand.secondary.80}' },
          },
          label: {
            color: { value: '{colors.green.80}' },
          },
        },
      },
    },
  },
};

const options = ['html', 'css', 'javascript'];

export const RadioGroupFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <RadioGroupField label="Language" name="language6" defaultValue="html">
      {options.map((option) => (
        <Radio key={option} value={option}>
          {option}
        </Radio>
      ))}
    </RadioGroupField>
  </ThemeProvider>
);
