import { Button, VisuallyHidden } from '@aws-amplify/ui-react';
import { MdClose, MdMenu } from 'react-icons/md';

export const MenuButton = ({ expanded, setExpanded }) => (
  <Button
    size="small"
    aria-expanded={expanded}
    aria-controls="docs-sidebar"
    className={`docs-header-menu-button ${expanded ? 'close' : 'open'}`}
    onClick={() => setExpanded(!expanded)}
  >
    <VisuallyHidden>{expanded ? 'Close menu' : 'Open menu'}</VisuallyHidden>
    {expanded ? (
      <MdClose className="docs-header-icon" />
    ) : (
      <MdMenu className="docs-header-icon" />
    )}
  </Button>
);
