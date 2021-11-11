import Link from 'next/link';
import { Heading, Collection } from '@aws-amplify/ui-react';
import { useRouter } from 'next/router';

import {
  baseComponents,
  ComponentNavItem,
  connectedComponents,
  dataDisplayComponents,
  feedbackComponents,
  inputComponents,
  layoutComponents,
  navigationComponents,
  utilityComponents,
} from '../../data/links';

const NavLinks = ({ items }: { items: ComponentNavItem[] }) => (
  <Collection type="list" items={items}>
    {({ href, label }) => <NavLink href={href}>{label}</NavLink>}
  </Collection>
);

const NavLink = ({ href, children }) => {
  const { pathname } = useRouter();
  const isCurrent = pathname === href;

  return (
    <Link href={href}>
      <a className={`docs-secondary-nav-link ${isCurrent ? 'current' : ''}`}>
        {children}
      </a>
    </Link>
  );
};

// TODO: clean up this logic
export const SecondaryNav = () => {
  const router = useRouter();
  if (router.pathname.startsWith('/theming')) {
    return (
      <Sidebar>
        <NavLink href="/theming">Overview</NavLink>
        <NavLink href="/theming/responsive">Responsive</NavLink>
        <NavLink href="/theming/dark-mode">Dark mode</NavLink>
        <NavLink href="/theming/alternative-styling">
          Alternative styling
        </NavLink>
      </Sidebar>
    );
  }

  if (router.pathname.startsWith('/getting-started')) {
    return (
      <Sidebar>
        <NavLink href="/getting-started/installation">Installation</NavLink>
      </Sidebar>
    );
  }

  if (router.pathname.startsWith('/components')) {
    return (
      <Sidebar>
        <Heading level={6}>Connected Components</Heading>
        <NavLinks items={connectedComponents} />

        <Heading level={6}>Base</Heading>
        <NavLinks items={baseComponents} />

        <Heading level={6}>Feedback</Heading>
        <NavLinks items={feedbackComponents} />

        <Heading level={6}>Navigation</Heading>
        <NavLinks items={navigationComponents} />

        <Heading level={6}>Inputs</Heading>
        <NavLinks items={inputComponents} />

        <Heading level={6}>Layout</Heading>
        <NavLinks items={layoutComponents} />

        <Heading level={6}>Data Display</Heading>
        <NavLinks items={dataDisplayComponents} />

        <Heading level={6}>Utilities</Heading>
        <NavLinks items={utilityComponents} />
      </Sidebar>
    );
  }
  return null;
};

const Sidebar = ({ children }) => {
  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar-inner">
        <nav className="docs-sidebar-nav">{children}</nav>
      </div>
    </aside>
  );
};
