import { SelectField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'selectfield-theme',
  tokens: {
    components: {
      select: {
        // TODO: customize here
      },
      selectfield: {
        // TODO: customize here
      },
    },
  },
};

export const SelectFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
    <SelectField label="Fruit">
      <option value="apple">Apple</option>
      <option value="banana">Banana</option>
      <option value="orange">Orange</option>
    </SelectField>
  </ThemeProvider>
);
