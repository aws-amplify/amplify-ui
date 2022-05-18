import * as React from 'react';
import { Menu, MenuItem, View } from '@aws-amplify/ui-react';

export const ControlledExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = (open) => {
    setIsOpen(open);
    // Do something else
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <View width="4rem">
      <Menu
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        width="3rem"
        maxWidth="4rem"
      >
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
    </View>
  );
};
