import {
  SearchField,
  ThemeProvider,
  Theme,
  useTheme,
} from '@aws-amplify/ui-react';

export const SearchFieldThemeExample = () => {
  const { tokens } = useTheme();

  const theme: Theme = {
    name: 'searchfield-theme',
    tokens: {
      components: {
        searchfield: {
          color: { value: 'red' },
          button: {
            color: { value: 'red' },
            _hover: {
              color: { value: tokens.colors.blue[80].value },
            },
          },
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <SearchField label="search" />
    </ThemeProvider>
  );
};
