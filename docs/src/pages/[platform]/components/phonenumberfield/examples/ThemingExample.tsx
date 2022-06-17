import { ThemeProvider, PhoneNumberField } from '@aws-amplify/ui-react';

const theme = {
  name: 'phonenumber-theme',
  tokens: {
    components: {
      phonenumberfield: {
        color: { value: '{colors.blue.60}' },
        fontSize: { value: '{fontSizes.large}' },
        borderColor: { value: '{colors.neutral.80}' },
        _focus: {
          borderColor: { value: '{colors.neutral.80}' },
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
