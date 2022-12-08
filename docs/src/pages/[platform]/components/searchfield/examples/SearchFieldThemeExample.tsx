import { SearchField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'searchfield-theme',
  tokens: {
    components: {
      searchfield: {
        button: {
          color: { value: '{colors.blue.80}' },
          backgroundColor: { value: '{colors.blue.20}' },
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
    <ThemeProvider theme={theme} colorMode="light">
      <SearchField label="search" />
    </ThemeProvider>
  );
};
