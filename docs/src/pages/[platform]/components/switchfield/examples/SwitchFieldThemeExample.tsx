import { SwitchField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'switchfield-theme',
  tokens: {
    components: {
      switchfield: {
        thumb: {
          backgroundColor: { value: '{colors.green.40}' },
          borderColor: { value: '{colors.border.tertiary}' },
          transition: {
            duration: { value: '{time.long}' },
          },
        },

        track: {
          backgroundColor: { value: '{colors.neutral.60}' },
          checked: {
            backgroundColor: { value: '{colors.brand.secondary.60}' },
          },
          transition: {
            duration: { value: '{time.long}' },
          },
        },
      },
    },
  },
};

export const SwitchFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <SwitchField label="Themed Switch" />
  </ThemeProvider>
);
