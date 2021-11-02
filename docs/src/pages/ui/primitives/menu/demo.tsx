import * as React from 'react';

import { Divider, Menu, MenuItem, View } from '@aws-amplify/ui-react';
import { MenuPropControls } from '@/components/MenuPropControls';
import { useMenuProps } from '@/components/useMenuProps';
import { Example } from '@/components/Example';

export const MenuDemo = () => {
  const props = useMenuProps({
    align: 'start',
    size: null,
  });

  return (
    <View>
      <MenuPropControls {...props} />
      <Example>
        <Menu {...props}>
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
          <MenuItem onClick={() => alert('Attend a workshop')}>
            Attend a workshop
          </MenuItem>
        </Menu>
      </Example>
    </View>
  );
};
