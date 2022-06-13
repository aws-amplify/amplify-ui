import { SwitchField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'switchfield-theme',
  tokens: {
    components: {
      switchfield: {
        thumb: {
          backgroundColor: { value: '{colors.green.40.value}' },
          borderColor: { value: '{colors.border.tertiary.value}' },
          transition: {
            duration: { value: '{time.long.value}' },
          },
        },

        track: {
          backgroundColor: { value: '{colors.neutral.60.value}' },
          checked: {
            backgroundColor: { value: '{colors.brand.secondary.60.value}' },
          },
          transition: {
            duration: { value: '{time.long.value}' },
          },
        },
      },
    },
  },
};

export const SwitchFieldThemeExample = () => (
  <ThemeProvider theme={theme}>
    <SwitchField label="Themed Switch" />
  </ThemeProvider>
);
