import { Flex, Menu, MenuItem } from '@aws-amplify/ui-react';

export const MenuAlignExample = () => {
  return (
    <Flex direction="column" width="4rem">
      <Menu>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </Menu>
      <Menu menuAlign="center">
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </Menu>
      <Menu menuAlign="end">
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </Menu>
    </Flex>
  );
};
