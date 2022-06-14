import {
  SearchField,
  ThemeProvider,
  Theme,
  defaultDarkModeOverride,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'searchfield-theme',
  tokens: {
    components: {
      searchfield: {
        // color seems to have no effect
        color: { value: '{colors.blue.40}' },

        button: {
          color: { value: '{colors.blue.40}' },
          _focus: {
            backgroundColor: {
              value: '{colors.blue.20}',
            },
            color: { value: 'white' },
          },
          _hover: {
            backgroundColor: {
              value: '{colors.blue.40}',
            },
            color: { value: 'white' },
          },
        },
      },
    },
  },
  overrides: [defaultDarkModeOverride],
};

export const SearchFieldThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="system">
      <SearchField label="search" />
    </ThemeProvider>
  );
};
