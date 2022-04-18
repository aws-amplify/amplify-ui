import * as React from 'react';
import { Divider, Menu, MenuItem } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { MenuPropControls, MenuPropControlsProps } from './MenuPropControls';
import { useMenuProps } from './useMenuProps';

const propsToCode = (props: MenuPropControlsProps) => {
  const size = props.size ? `\n  size="${props.size}"` : '';
  return `<Menu ${size}
  menuAlign="${props.menuAlign}"
  >
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
</Menu>`;
};

export const MenuDemo = () => {
  const menuProps = useMenuProps({
    menuAlign: 'start',
    size: null,
  });

  return (
    <Demo
      code={propsToCode(menuProps)}
      propControls={<MenuPropControls {...menuProps} />}
    >
      <Menu {...menuProps}>
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
