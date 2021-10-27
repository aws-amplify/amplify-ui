import * as React from 'react';

import { Divider, Flex, Menu, MenuItem } from '@aws-amplify/ui-react';

export const MenuDemo = () => {
  return (
    <Flex direction="column">
      <Menu>
        <MenuItem onClick={() => alert('🤯')}>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <Divider />
        <MenuItem isDisabled>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </Menu>
    </Flex>
  );
};
