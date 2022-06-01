import { SearchField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'searchfield-theme',
  tokens: {
    components: {
      searchfield: {
        search: {
          color: { value: 'red' },
          _disabled: { color: { value: 'green' } },
          _hover: {
            color: { value: 'green' },
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
