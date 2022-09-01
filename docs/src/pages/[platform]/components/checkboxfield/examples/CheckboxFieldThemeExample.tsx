import {
  CheckboxField,
  ThemeProvider,
  Theme,
  createTheme,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'checkbox-theme',
  tokens: {
    components: {
      checkbox: {
        button: {
          color: { value: '{colors.yellow.40}' },
          _focus: {
            outlineColor: { value: '{colors.blue.40}' },
            borderColor: { value: '{colors.red.40}' },
          },
        },
        icon: {
          backgroundColor: { value: '{colors.brand.secondary.80}' },
        },
      },
    },
  },
};

const override: any = {
  name: 'test-theme',
  tokens: {},
  overrides: [
    {
      mediaQuery: 'prefers-color-scheme: dark',
      tokens: {
        colors: {
          background: {
            primary: { value: '#000' },
          },
        },
      },
    },
    {
      breakpoint: 'small',
      tokens: {
        space: {
          medium: { value: '0.5rem' },
        },
      },
    },
    {
      breakpoint: 'large',
      tokens: {
        space: {
          medium: { value: '2.5rem' },
        },
      },
    },
    {
      selector: '.disco-theme',
      tokens: {
        colors: {
          background: {
            primary: { value: 'pink' },
          },
        },
      },
    },
  ],
};

console.log(createTheme(override).cssText);

export const CheckboxFieldThemeExample = () => (
  <ThemeProvider theme={theme} colorMode="light">
    <CheckboxField label="Subscribe" name="subscribe" value="yes" />
  </ThemeProvider>
);
