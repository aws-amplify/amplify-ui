import { SwitchField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'switchfield-theme',
  tokens: {
    components: {
      switchfield: {
        thumb: {
          backgroundColor: { value: '{colors.background.primary}' },
          borderColor: { value: '{colors.border.primary}' },
          transition: {
            duration: { value: '{time.long}' },
          },
        },

        track: {
          backgroundColor: { value: '{colors.background.tertiary}' },
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
