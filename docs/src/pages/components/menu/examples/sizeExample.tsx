import { Menu, MenuItem, Flex } from '@aws-amplify/ui-react';

export const SizeExample = () => {
  return (
    <Flex direction="column" width="4rem">
      <Menu size="small">
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </Menu>
      <Menu>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </Menu>
      <Menu size="large">
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
      </Menu>
    </Flex>
  );
};
