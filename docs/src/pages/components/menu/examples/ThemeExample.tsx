import {
  Divider,
  Menu,
  MenuItem,
  ThemeProvider,
  Card,
} from '@aws-amplify/ui-react';

export const ThemeExample = () => {
  return (
    <ThemeProvider
      theme={{
        name: 'special-menu-theme',
        tokens: {
          colors: {
            background: {
              primary: { value: 'hotpink' },
            },
          },
          components: {
            menu: {
              backgroundColor: { value: 'blue' },
            },
          },
        },
      }}
    >
      <Card />
      <Menu>
        <MenuItem onClick={() => alert('Download')}>Download</MenuItem>
        <MenuItem onClick={() => alert('Create a Copy')}>
          Create a Copy
        </MenuItem>
        <MenuItem onClick={() => alert('Mark as Draft')}>
          Mark as Draft
        </MenuItem>
        <Divider />
        <MenuItem isDisabled onClick={() => alert('Delete')}>
          Delete
        </MenuItem>
        <MenuItem onClick={() => alert('Attend a workshop')}>
          Attend a workshop
        </MenuItem>
      </Menu>
    </ThemeProvider>
  );
};
