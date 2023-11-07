import { Fieldset, ThemeProvider, createTheme } from '@aws-amplify/ui-react';

const theme = createTheme({
  name: 'fieldset-theme',
  tokens: {
    components: {
      fieldset: {
        outlined: {
          borderStyle: 'dashed',
          borderWidth: '2px',
          borderColor: '{colors.primary.20}',
          padding: '{space.large}',
        },
        legend: {
          fontSize: '{fontSizes.large}',
          color: '{colors.primary.80}',
          fontWeight: '400',
        },
      },
    },
  },
});

export const FieldsetThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <Fieldset legend="Default fieldset with theming">
      Some content of the fieldset.
    </Fieldset>
  </ThemeProvider>
);
