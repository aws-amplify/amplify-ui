import { Menu, MenuItem, ThemeProvider, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'menu-theme',
  tokens: {
    components: {
      menu: {
        backgroundColor: { value: '{colors.blue.20}' },
        borderRadius: { value: '0' },
        item: {
          minHeight: { value: '5rem' },
        },
      },
    },
  },
};

export const MenuThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="light">
      <Menu>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
      </Menu>
    </ThemeProvider>
  );
};
