import { Collection, Heading } from '@aws-amplify/ui-react';
import {
  ComponentNavItem,
  baseComponents,
  connectedComponents,
  dataDisplayComponents,
  feedbackComponents,
  inputComponents,
  layoutComponents,
  navigationComponents,
  utilityComponents,
} from '../../data/links';

import Link from 'next/link';
import LinkButton from './LinkButton';
import { useCustomRouter } from '@/components/useCustomRouter';

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
  const {
    query: { platform = 'react' },
    asPath,
  } = useCustomRouter();
  const isCurrent = asPath === `/${platform}${href}`;
  const classNames = `docs-secondary-nav-link ${isCurrent ? 'current' : ''}`;

  if (platforms.length && !platforms.includes(platform)) {
    return null;
  }

  return (
    <Link href={`/${platform}${href}`} passHref>
      <LinkButton onClick={onClick} classNames={classNames}>
        {children}
      </LinkButton>
    </Link>
  );
};

const NavLinkComponentsSection = ({ heading, components, ...props }) => {
  const { query } = useCustomRouter();
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
  const {
    pathname,
    query: { platform },
  } = useCustomRouter();

  // Extract section from URL (/section/... => section)
  const section = pathname.split('/')[2];

  switch (section) {
    case 'theming':
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
            href="/theming/css-variables"
          >
            CSS Variables
          </NavLink>
        </>
      );
    case 'guides':
      return (
        <>
          <NavLink {...props} href="/guides">
            Guides
          </NavLink>
          <NavLink
            {...props}
            platforms={['react', 'vue', 'angular']}
            href="/guides/css-in-js"
          >
            CSS in JS
          </NavLink>
          {platform === 'react' && (
            <NavLink {...props} href="/guides/auth-protected">
              Protected Routes
            </NavLink>
          )}
        </>
      );
    case 'getting-started':
      return (
        <>
          <NavLink {...props} href="/getting-started/installation">
            Installation
          </NavLink>
          <NavLink {...props} href="/getting-started/usage">
            Usage
          </NavLink>
          <NavLink {...props} href="/getting-started/create-react-app">
            Create React App
          </NavLink>
          {platform !== 'flutter' && (
            <NavLink {...props} href="/getting-started/migration">
              Migration
            </NavLink>
          )}
          {platform !== 'flutter' && (
            <NavLink {...props} href="/getting-started/troubleshooting">
              Troubleshooting
            </NavLink>
          )}
        </>
      );
    case 'components':
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
    default:
      return null;
  }
};

export const Sidebar = () => {
  return (
    <nav aria-label="Section navigation" className="docs-sidebar">
      <div className="docs-sidebar-inner">
        <div className="docs-sidebar-nav">
          <SecondaryNav />
        </div>
      </div>
    </nav>
  );
};
