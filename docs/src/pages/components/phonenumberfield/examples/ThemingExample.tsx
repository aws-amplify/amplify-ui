import {
  AmplifyProvider,
  PhoneNumberField,
  Theme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'pagination-theme',
  tokens: {
    components: {
      countrycodeselect: {},
      fieldcontrol: {},
    },
  },
};

export const PaginationThemeExample = () => (
  <AmplifyProvider theme={theme}>
    <PhoneNumberField label="Themed field" defaultCountryCode="+1" />
  </AmplifyProvider>
);
