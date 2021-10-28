import * as React from 'react';

import { Divider, Flex, Menu, MenuItem } from '@aws-amplify/ui-react';

export const MenuDemo = () => {
  return (
    <Flex direction="column">
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
        <MenuItem onClick={() => alert('Attend a Workshop')}>
          Attend a Workshop
        </MenuItem>
      </Menu>
    </Flex>
  );
};
