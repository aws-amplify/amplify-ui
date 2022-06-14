import {
  ThemeProvider,
  Menu,
  MenuItem,
  Theme,
  defaultDarkModeOverride,
} from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'menu-theme',
  tokens: {
    components: {
      // Is there a way to theme the menu trigger button?
      menu: {
        backgroundColor: { value: '{colors.blue.20}' },
        borderRadius: { value: '0' },
        item: {
          minHeight: { value: '5rem' },
        },
      },
    },
  },
  overrides: [defaultDarkModeOverride],
};

export const MenuThemeExample = () => {
  return (
    <ThemeProvider theme={theme} colorMode="system">
      <Menu>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
      </Menu>
    </ThemeProvider>
  );
};
