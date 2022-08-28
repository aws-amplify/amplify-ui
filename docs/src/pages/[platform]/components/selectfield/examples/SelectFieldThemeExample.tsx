import { SelectField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'selectfield-theme',
  tokens: {
    components: {
      selectfield: {
        color: { value: '{colors.blue.60}' },
        fontSize: { value: '{fontSizes.large}' },
        borderColor: { value: '{colors.red.60}' },
        _focus: {
          borderColor: { value: '{colors.red.80}' },
        },
        label: {
          color: { value: '{colors.blue.60}' },
        },
      },
    },
  },
};

export const SelectFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <SelectField label="Fruit">
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </SelectField>
  </ThemeProvider>
);
