import { SearchField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'searchfield-theme',
  tokens: {
    components: {
      searchfield: {
        // color seems to have no effect
        color: { value: '{colors.blue.80}' },

        button: {
          color: { value: '{colors.blue.80}' },
          _focus: {
            backgroundColor: {
              value: '{colors.blue.60}',
            },
            color: { value: 'white' },
          },
          _hover: {
            backgroundColor: {
              value: '{colors.blue.80}',
            },
            color: { value: 'white' },
          },
        },
      },
    },
  },
};

export const SearchFieldThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <SearchField label="search" />
    </ThemeProvider>
  );
};
