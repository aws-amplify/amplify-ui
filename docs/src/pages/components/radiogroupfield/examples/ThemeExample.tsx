import {
  Radio,
  RadioGroupField,
  AmplifyProvider,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'radio-theme',
  tokens: {
    colors: {
      border: {
        // Radio focus state inherits this global focus color
        focus: { value: '{colors.brand.secondary.80}' },
      },
      font: {
        primary: { value: '{colors.brand.secondary.60}' },
        secondary: { value: '{colors.brand.secondary.40}' },
      },
    },
    components: {
      radio: {
        button: {
          borderWidth: { value: '{borderWidths.small}' },
          borderColor: { value: '{colors.brand.secondary.60}' },
          backgroundColor: { value: '{colors.brand.secondary.10}' },
          color: { value: '{colors.brand.secondary.10}' },
          _checked: {
            color: { value: '{colors.brand.secondary.80}' },
          },
        },
      },
    },
  },
};

const options = ['html', 'css', 'javascript'];

export const ThemeExample = () => (
  <AmplifyProvider theme={theme}>
    <RadioGroupField label="Language" name="language6" defaultValue="html">
      {options.map((option) => (
        <Radio key={option} value={option}>
          {option}
        </Radio>
      ))}
    </RadioGroupField>
  </AmplifyProvider>
);
