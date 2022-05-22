import { Menu, MenuItem, MenuButton } from '@aws-amplify/ui-react';

export const MenuExample = () => (
  <Menu
    trigger={
      <MenuButton variation="primary" size="large" width="40%">
        Custom trigger button 🚀
      </MenuButton>
    }
  >
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
  </Menu>
);
