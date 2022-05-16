import { AmplifyProvider, Menu, MenuItem, Theme } from '@aws-amplify/ui-react';

const theme: Theme = {
  name: 'custom-theme',
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

export const ThemeExample = () => {
  return (
    <AmplifyProvider theme={theme}>
      <Menu>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
      </Menu>
    </AmplifyProvider>
  );
};
