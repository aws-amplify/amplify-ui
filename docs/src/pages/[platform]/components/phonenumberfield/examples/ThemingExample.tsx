import {
  AmplifyProvider,
  PhoneNumberField,
  Theme,
} from '@aws-amplify/ui-react';

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

export const ThemingExample = () => (
  <AmplifyProvider theme={theme}>
    <PhoneNumberField label="Themed field" defaultCountryCode="+1" />
  </AmplifyProvider>
);
