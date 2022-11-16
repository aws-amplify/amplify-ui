import { Autocomplete, ThemeProvider, Theme } from '@aws-amplify/ui-react';
import * as React from 'react';

const theme: Theme = {
  name: 'autocomplete-theme',
  tokens: {
    components: {
      autocomplete: {
        menu: {
          option: {
            _active: {
              backgroundColor: {
                value: '{colors.brand.secondary.80}',
              },
            },
          },
        },
      },
    },
  },
};

const options = [
  { id: 'apple', label: 'apple' },
  { id: 'banana', label: 'banana' },
  { id: 'cherry', label: 'cherry' },
  { id: 'grape', label: 'grape' },
  { id: 'kiwis', label: 'kiwis' },
  { id: 'lemon', label: 'lemon' },
  { id: 'mango', label: 'mango' },
  { id: 'orange', label: 'orange' },
  { id: 'strawberry', label: 'strawberry' },
];

export const AutocompleteThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Autocomplete label="Autocomplete theme example" options={options} />
    </ThemeProvider>
  );
};
