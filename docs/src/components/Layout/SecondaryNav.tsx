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
import LinkButton from './LinkButton';

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

const NavLink = ({ href, children, onClick, platforms = [] }) => {
  const { pathname, query } = useRouter();
  const isCurrent = pathname === href;
  const { platform = 'react' } = query;
  const classNames = `docs-secondary-nav-link ${isCurrent ? 'current' : ''}`;

  if (platforms.length && !platforms.includes(platform)) {
    return null;
  }
  return (
    <Link href={{ pathname: href, query }} passHref>
      <LinkButton href={href} onClick={onClick} classNames={classNames}>
        {children}
      </LinkButton>
    </Link>
  );
};

const NavLinkComponentsSection = ({ heading, components, ...props }) => {
  const { query } = useRouter();
  const { platform = 'react' } = query;

  const platformComponents = components.filter((component) => {
    if (component.platforms) {
      return component.platforms.includes(platform);
    }
    return true;
  });

  if (!platformComponents.length) {
    return null;
  }
  return (
    <>
      <Heading level={6}>{heading}</Heading>
      <NavLinks {...props} items={platformComponents} />
    </>
  );
};

// TODO: clean up this logic
export const SecondaryNav = (props) => {
  const router = useRouter();
  const { query } = useRouter();
  const { platform = 'react' } = query;

  // Extract section from URL (/section/... => section)
  const section = router.pathname.split('/')[1];

  if (section === 'theming') {
    return (
      <>
        <NavLink {...props} href="/theming">
          Overview
        </NavLink>
        <NavLink
          {...props}
          platforms={['react', 'vue', 'angular']}
          href="/theming/responsive"
        >
          Responsive
        </NavLink>
        <NavLink {...props} href="/theming/dark-mode">
          Dark mode
        </NavLink>
        <NavLink
          {...props}
          platforms={['react', 'vue', 'angular']}
          href="/theming/alternative-styling"
        >
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
        {platform !== 'flutter' && (
          <NavLink {...props} href="/getting-started/migration">
            Migration
          </NavLink>
        )}
      </>
    );
  }

  if (section === 'components') {
    return (
      <>
        <NavLinkComponentsSection
          heading={'Connected Components'}
          components={connectedComponents}
        ></NavLinkComponentsSection>

        <NavLinkComponentsSection
          heading={'Base'}
          components={baseComponents}
        ></NavLinkComponentsSection>

        <NavLinkComponentsSection
          heading={'Feedback'}
          components={feedbackComponents}
        ></NavLinkComponentsSection>

        <NavLinkComponentsSection
          heading={'Navigation'}
          components={navigationComponents}
        ></NavLinkComponentsSection>

        <NavLinkComponentsSection
          heading={'Inputs'}
          components={inputComponents}
        ></NavLinkComponentsSection>

        <NavLinkComponentsSection
          heading={'Layout'}
          components={layoutComponents}
        ></NavLinkComponentsSection>

        <NavLinkComponentsSection
          heading={'Data Display'}
          components={dataDisplayComponents}
        ></NavLinkComponentsSection>

        <NavLinkComponentsSection
          heading={'Utilities'}
          components={utilityComponents}
        ></NavLinkComponentsSection>
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
