import { Radio, RadioGroupField, AmplifyProvider } from '@aws-amplify/ui-react';

const theme = {
  name: 'radio-theme',
  tokens: {
    colors: {
      border: {
        // Radio focus state inherits this global focus color
        focus: { value: '{colors.brand.secondary.80}' },
      },
    },
    components: {
      radio: {
        button: {
          borderWidth: { value: '{borderWidths.small}' },
          borderColor: { value: '{colors.brand.secondary.40}' },
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
    <RadioGroupField label="Language" name="language" defaultValue="html">
      {options.map((option) => (
        <Radio key={option} value={option}>
          {option}
        </Radio>
      ))}
    </RadioGroupField>
  </AmplifyProvider>
);
