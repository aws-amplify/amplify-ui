import * as React from 'react';

import { Divider, Flex, Menu, MenuItem, Button } from '@aws-amplify/ui-react';

const BigTrigger = React.forwardRef<HTMLDivElement, {}>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      style={{ width: '100px', height: '100px', backgroundColor: 'blue' }}
    >
      Click me
    </div>
  );
});

export const BasicExample = () => {
  return (
    <Menu>
      <MenuItem onClick={() => alert('Download')}>Download</MenuItem>
      <MenuItem onClick={() => alert('Create a Copy')}>Create a Copy</MenuItem>
      <MenuItem onClick={() => alert('Mark as Draft')}>Mark as Draft</MenuItem>
      <Divider />
      <MenuItem isDisabled onClick={() => alert('Delete')}>
        Delete
      </MenuItem>
      <MenuItem onClick={() => alert('Attend a workshop')}>
        Attend a workshop
      </MenuItem>
    </Menu>
  );
};

export const CustomMenuTriggerDemo = () => (
  <Menu trigger={<BigTrigger />}>
    <MenuItem>
      Download this really really really long menu item description
    </MenuItem>
    <MenuItem>Create a Copy</MenuItem>
    <MenuItem>Mark as Draft</MenuItem>
    <Divider />
    <MenuItem isDisabled>Delete</MenuItem>
    <MenuItem>Attend a workshop</MenuItem>
  </Menu>
);

export const ControlledMenuDemo = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    // Only handle close events (clicking out of menu or hitting ESC)
    if (!open) {
      setIsOpen(false);
    }
  };

  return (
    <Flex direction="column">
      <Button onClick={() => setIsOpen(!isOpen)}>Open menu</Button>
      <Menu onOpenChange={handleOpenChange} isOpen={isOpen}>
        <MenuItem onClick={() => setIsOpen(false)}>
          Download this really really really long menu item description
        </MenuItem>
        <MenuItem onClick={() => setIsOpen(false)}>Create a Copy</MenuItem>
        <MenuItem onClick={() => setIsOpen(false)}>Mark as Draft</MenuItem>
        <Divider />
        <MenuItem isDisabled onClick={() => setIsOpen(false)}>
          Delete
        </MenuItem>
        <MenuItem>Attend a workshop</MenuItem>
      </Menu>
    </Flex>
  );
};
