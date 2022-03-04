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

export const ThemeExample = () => (
  <AmplifyProvider theme={theme}>
    <RadioGroupField label="Language" name="language" defaultValue="html">
      <Radio value="html">html</Radio>
      <Radio value="css">css</Radio>
      <Radio value="javascript">javascript</Radio>
    </RadioGroupField>
  </AmplifyProvider>
);
