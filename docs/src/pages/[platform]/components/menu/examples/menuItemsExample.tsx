import { Menu, MenuItem, View, Divider } from '@aws-amplify/ui-react';

export const MenuItemsExample = () => {
  return (
    <View width="4rem">
      <Menu>
        <MenuItem onClick={() => alert('Download')}>Download</MenuItem>
        <MenuItem onClick={() => alert('Create a Copy')}>
          Create a Copy
        </MenuItem>
        <Divider />
        <MenuItem isDisabled onClick={() => alert('Delete')}>
          Delete
        </MenuItem>
      </Menu>
    </View>
  );
};
