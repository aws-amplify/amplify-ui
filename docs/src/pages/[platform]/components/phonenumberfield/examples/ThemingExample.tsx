import { ThemeProvider, PhoneNumberField, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'phonenumber-theme',
  tokens: {
    components: {
      phonenumberfield: {
        color: { value: '{colors.blue.60}' },
        fontSize: { value: '{fontSizes.large}' },
        borderColor: { value: '{colors.red.60}' },
        _focus: {
          borderColor: { value: '{colors.red.80}' },
        },
      },
    },
  },
};

export const ThemingExample = () => (
  <ThemeProvider theme={theme}>
    <PhoneNumberField label="Themed field" defaultCountryCode="+1" />
  </ThemeProvider>
);
