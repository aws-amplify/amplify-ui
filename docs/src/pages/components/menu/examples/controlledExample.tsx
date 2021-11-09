import * as React from 'react';

import { Menu, MenuItem } from '@aws-amplify/ui-react';

export const ControlledExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    // Do something else
  };
  const closeMenu = () => setIsOpen(false);

  return (
    <Menu onOpenChange={handleOpenChange} isOpen={isOpen}>
      <MenuItem
        onClick={() => {
          closeMenu();
          alert('Download');
        }}
      >
        Download
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu();
          alert('Create a Copy');
        }}
      >
        Create a Copy
      </MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu();
          alert('Mark as Draft');
        }}
      >
        Mark as Draft
      </MenuItem>
    </Menu>
  );
};
