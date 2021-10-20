import { useState } from 'react';
import Link from 'next/link';
import { Icon, IconChevronRight, IconNotStarted, IconWidgets, IconDeviceHub, SearchField, View, Heading } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

const NavLink = ({ href, children }) => {
  const router = useRouter();
  const isCurrent = router.pathname === href;
  
  return (
    <Link href={href}>
      <a className={`aui-docs-nav-link ${isCurrent ? 'current' : ''}`}>{children}</a>
    </Link>
  )
}

export const ComponentsSidebar = () => {
  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar-inner">
      
      <nav className="docs-sidebar-nav">
        <Heading level={6}>Connected Components</Heading>
        <NavLink href="/connected-components/authenticator">Authenticator</NavLink>

        <Heading level={6}>Base</Heading>
        <NavLink href="/ui/primitives/view">View</NavLink>
        <NavLink href="/ui/primitives/text">Text</NavLink>
        <NavLink href="/ui/primitives/heading">Heading</NavLink>
        <NavLink href="/ui/primitives/link">Link</NavLink>
        <NavLink href="/ui/primitives/image">Image</NavLink>
        <NavLink href="/ui/primitives/divider">Divider</NavLink>
        <NavLink href="/ui/primitives/icon">Icon</NavLink>
        
        <Heading level={6}>Inputs</Heading>
        <NavLink href="/ui/primitives/textfield">Text Field</NavLink>
        <NavLink href="/ui/primitives/selectfield">Select Field</NavLink>
        <NavLink href="/ui/primitives/stepperField">Stepper Field</NavLink>
        <NavLink href="/ui/primitives/searchfield">Search Field</NavLink>
        <NavLink href="/ui/primitives/passwordfield">Password Field</NavLink>
        <NavLink href="/ui/primitives/phonenumberfield">Phone Number Field</NavLink>
        <NavLink href="/ui/primitives/switchfield">Switch Field</NavLink>
        <NavLink href="/ui/primitives/radiogroupfield">Radio Group Field</NavLink>
        <NavLink href="/ui/primitives/checkboxfield">Checkbox Field</NavLink>
        <NavLink href="/ui/primitives/togglebutton">Toggle Button</NavLink>
        <NavLink href="/ui/primitives/button">Button</NavLink>
        
        <Heading level={6}>Layout</Heading>
        <NavLink href="/ui/primitives/collection">Collection</NavLink>
        <NavLink href="/ui/primitives/flex">Flex</NavLink>
        <NavLink href="/ui/primitives/grid">Grid</NavLink>
        <NavLink href="/ui/primitives/table">Table</NavLink>
        
        <Heading level={6}>Feedback</Heading>
        <NavLink href="/ui/primitives/alert">Alert</NavLink>
        <NavLink href="/ui/primitives/pagination">Pagination</NavLink>
        <NavLink href="/ui/primitives/placeholder">Placeholder</NavLink>
        <NavLink href="/ui/primitives/loader">Loader</NavLink>
        
        <Heading level={6}>Data Display</Heading>
        <NavLink href="/ui/primitives/badge">Badge</NavLink>
        <NavLink href="/ui/primitives/rating">Rating</NavLink>
        
        <Heading level={6}>Utilities</Heading>
        <NavLink href="/ui/primitives/visuallyhidden">Visually Hidden</NavLink>
      </nav>
      </div>
    </aside>
  )
}
