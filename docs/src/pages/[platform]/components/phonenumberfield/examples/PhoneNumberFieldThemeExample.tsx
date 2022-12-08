import { ThemeProvider, PhoneNumberField } from '@aws-amplify/ui-react';

const theme = {
  name: 'phonenumber-theme',
  tokens: {
    components: {
      phonenumberfield: {
        //these design tokens will apply to both the select and input that are part of the phonenumber field
        color: { value: '{colors.blue.60}' },
        fontSize: { value: '{fontSizes.large}' },
        borderColor: { value: '{colors.neutral.80}' },
        _focus: {
          borderColor: { value: '{colors.neutral.100}' },
        },
      },
    },
  },
};

export const PhoneNumberFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <PhoneNumberField
      label="Themed field"
      defaultDialCode="+1"
      labelHidden={true}
    />
  </ThemeProvider>
);
