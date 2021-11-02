import { Flex, Menu, MenuItem } from '@aws-amplify/ui-react';

export const AlignExample = () => {
  return (
    <Flex direction="column" width="4rem">
      <Menu>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </Menu>
      <Menu align="center">
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </Menu>
      <Menu align="end">
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </Menu>
    </Flex>
  );
};
