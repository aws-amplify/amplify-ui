import { Menu, MenuItem, IconsProvider } from '@aws-amplify/ui-react';
import { FiMoreHorizontal } from 'react-icons/fi';

export const MenuIconExample = () => (
  <IconsProvider
    icons={{
      menu: {
        menu: <FiMoreHorizontal />,
      },
    }}
  >
    <Menu>
      <MenuItem>Download</MenuItem>
      <MenuItem>Create a Copy</MenuItem>
      <MenuItem>Mark as Draft</MenuItem>
    </Menu>
  </IconsProvider>
);
