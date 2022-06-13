import { SearchField, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'searchfield-theme',
  tokens: {
    components: {
      searchfield: {
        // color seemingly has no effect
        // color: { value: 'red' },
        button: {
          color: { value: 'red' },
          _active: {
            backgroundColor: {
              value: 'green',
            },
            borderColor: {
              value: 'yellow',
            },
            color: { value: 'white' },
          },
          _focus: {
            backgroundColor: {
              value: 'purple',
            },
            borderColor: {
              value: 'red',
            },
            color: { value: 'yellow}' },
          },
          _hover: {
            backgroundColor: {
              value: 'orange',
            },
            borderColor: {
              value: 'blue',
            },
            color: { value: 'black' },
          },
        },
      },
      // fieldcontrol: {
      //   color: { value: 'red' },
      // },
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
