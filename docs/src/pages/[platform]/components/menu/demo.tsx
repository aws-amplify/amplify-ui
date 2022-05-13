import * as React from 'react';
import { Divider, Menu, MenuItem } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { MenuPropControls, MenuPropControlsProps } from './MenuPropControls';
import { useMenuProps } from './useMenuProps';
import { demoState } from '@/utils/demoState';
import { getPropString } from '../utils/getPropString';

const propsToCode = (props: MenuPropControlsProps) => {
  return (
    `<Menu
  menuAlign="${props.menuAlign}"` +
    getPropString(props.size, 'size') +
    `\n>
  <MenuItem onClick={() => alert('Download')}>
    Download
  </MenuItem>
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
</Menu>`
  );
};

const defaultMenuProps = {
  menuAlign: 'start',
  size: null,
};

export const MenuDemo = () => {
  const menuProps = useMenuProps(
    demoState.get(Menu.displayName) || defaultMenuProps
  );

  return (
    <Demo
      code={propsToCode(menuProps)}
      propControls={<MenuPropControls {...menuProps} />}
    >
      <Menu menuAlign={menuProps.menuAlign} size={menuProps.size}>
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
    </Demo>
  );
};
