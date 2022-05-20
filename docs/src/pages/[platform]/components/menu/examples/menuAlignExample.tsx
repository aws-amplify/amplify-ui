import { Flex, Menu, MenuItem } from '@aws-amplify/ui-react';

export const MenuAlignExample = () => {
  return (
    <Flex direction="column" width="4rem">
      <Menu>
        <MenuItem>Align start (default)</MenuItem>
      </Menu>
      <Menu menuAlign="center">
        <MenuItem>Align center</MenuItem>
      </Menu>
      <Menu menuAlign="end">
        <MenuItem>Align end</MenuItem>
      </Menu>
    </Flex>
  );
};
