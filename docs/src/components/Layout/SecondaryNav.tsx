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

const NavLinks = ({
  items,
  onClick,
}: {
  items: ComponentNavItem[];
  onClick?: () => void;
}) => (
  <Collection type="list" items={items} gap="0">
    {({ href, label }) => (
      <NavLink key={label} href={href} onClick={onClick}>
        {label}
      </NavLink>
    )}
  </Collection>
);

const NavLink = ({ href, children, onClick }) => {
  const { pathname, query } = useRouter();
  const isCurrent = pathname === href;

  return (
    <Link href={{ pathname: href, query }}>
      <div>
        <a
          onClick={onClick}
          className={`docs-secondary-nav-link ${isCurrent ? 'current' : ''}`}
        >
          {children}
        </a>
      </div>
    </Link>
  );
};

// TODO: clean up this logic
export const SecondaryNav = (props) => {
  const router = useRouter();
  const { platform = 'react' } = router.query;

  // Extract section from URL (/section/... => section)
  const section = router.pathname.split('/')[1];

  if (section === 'theming') {
    return (
      <>
        <NavLink {...props} href="/theming">
          Overview
        </NavLink>
        <NavLink {...props} href="/theming/responsive">
          Responsive
        </NavLink>
        <NavLink {...props} href="/theming/dark-mode">
          Dark mode
        </NavLink>
        <NavLink {...props} href="/theming/alternative-styling">
          Alternative styling
        </NavLink>
      </>
    );
  }

  if (section === 'getting-started') {
    return (
      <>
        <NavLink {...props} href="/getting-started/installation">
          Installation
        </NavLink>
      </>
    );
  }

  if (section === 'components') {
    return (
      <>
        <Heading level={6}>Connected Components</Heading>
        <NavLinks {...props} items={connectedComponents} />

        <Heading level={6}>Base</Heading>
        <NavLinks {...props} items={baseComponents} />

        <Heading level={6}>Feedback</Heading>
        <NavLinks {...props} items={feedbackComponents} />

        <Heading level={6}>Navigation</Heading>
        <NavLinks {...props} items={navigationComponents} />

        <Heading level={6}>Inputs</Heading>
        <NavLinks {...props} items={inputComponents} />

        <Heading level={6}>Layout</Heading>
        <NavLinks {...props} items={layoutComponents} />

        <Heading level={6}>Data Display</Heading>
        <NavLinks {...props} items={dataDisplayComponents} />

        <Heading level={6}>Utilities</Heading>
        <NavLinks {...props} items={utilityComponents} />
      </>
    );
  }
  return null;
};

export const Sidebar = () => {
  return (
    <aside className="docs-sidebar">
      <div className="docs-sidebar-inner">
        <nav className="docs-sidebar-nav">
          <SecondaryNav />
        </nav>
      </div>
    </aside>
  );
};
