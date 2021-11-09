import { Divider, Menu, MenuItem, MenuButton } from '@aws-amplify/ui-react';

export const MenuExample = () => (
  <Menu
    trigger={
      <MenuButton variation="primary" size="large">
        Menu
      </MenuButton>
    }
  >
    <MenuItem>Download</MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <Divider />
    <MenuItem isDisabled>Delete</MenuItem>
    <MenuItem>Attend a workshop</MenuItem>
  </Menu>
);
