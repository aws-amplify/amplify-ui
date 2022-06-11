import { PhoneNumberField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'phonenumber-theme',
  tokens: {
    components: {
      fieldcontrol: {
        color: { value: '{colors.blue.60}' },
        fontSize: { value: '{fontSizes.large}' },
      },
    },
  },
};

export const PhoneNumberFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
    <PhoneNumberField label="Themed field" defaultCountryCode="+1" />
  </ThemeProvider>
);
