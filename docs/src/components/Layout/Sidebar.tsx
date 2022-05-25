import * as React from 'react';
import {
  MdOutlineChecklist,
  MdOutlineWidgets,
  MdOutlineAutoAwesome,
  MdWebAssetOff,
  MdOutlineArticle,
  MdOutlinePower,
  MdClose,
  MdOpenInNew,
} from 'react-icons/md';
import {
  Text,
  Flex,
  Collection,
  Expander,
  ExpanderItem,
  VisuallyHidden,
  useTheme,
  Button,
  Divider,
  Link as ALink,
} from '@aws-amplify/ui-react';
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
  legacyComponents,
  guides,
  theming,
} from '../../data/links';

import Link from 'next/link';
import { useCustomRouter } from '@/components/useCustomRouter';
import { FrameworkChooser } from './FrameworkChooser';
import { LogoLink } from './LogoLink';
import { MenuButton } from './MenuButton';

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
      <a onClick={onClick} className={classNames}>
        {children}
      </a>
    </Link>
  );
};

const NavLinkComponentsSection = ({ heading, components, ...props }) => {
  const { query } = useCustomRouter();
  const { tokens } = useTheme();
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
      <Text
        fontSize={tokens.fontSizes.xs}
        fontWeight={tokens.fontWeights.semibold}
        textTransform="uppercase"
        letterSpacing="0.125em"
        color={tokens.colors.font.tertiary}
        padding={`${tokens.space.small} ${tokens.space.medium} ${tokens.space.xs} var(--secondary-nav-indent)`}
      >
        {heading}
      </Text>
      <NavLinks {...props} items={platformComponents} />
    </>
  );
};

const ExpanderTitle = ({ Icon, text }) => {
  const { tokens } = useTheme();
  return (
    <Flex
      direction="row"
      alignItems="center"
      gap={tokens.space.small}
      padding={tokens.space.xs}
    >
      <Icon
        style={{ height: '1.25rem', width: '1.25rem' }}
        color={tokens.colors.brand.primary[60]}
      />
      <Text as="span">{text}</Text>
    </Flex>
  );
};

// TODO: clean up this logic
const SecondaryNav = (props) => {
  const {
    pathname,
    query: { platform },
  } = useCustomRouter();

  // Extract section from URL (/section/... => section)
  const section = pathname.split('/')[2];
  const [value, setValue] = React.useState<string | string[]>([section]);

  return (
    <Expander type="multiple" value={value} onChange={setValue}>
      <ExpanderItem
        title={
          <ExpanderTitle Icon={MdOutlineChecklist} text="Getting started" />
        }
        value="getting-started"
      >
        <>
          <NavLink {...props} href="/getting-started/installation">
            Installation
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
      </ExpanderItem>
      <ExpanderItem
        title={
          <ExpanderTitle Icon={MdOutlinePower} text="Connected components" />
        }
        value="components"
      >
        {connectedComponents.map(({ label, ...rest }) => (
          <NavLink key={label} {...rest} onClick={props.onClick}>
            {label}
          </NavLink>
        ))}
      </ExpanderItem>
      <ExpanderItem
        title={
          <ExpanderTitle Icon={MdOutlineWidgets} text="Primitive components" />
        }
        value="components"
      >
        <>
          <NavLinkComponentsSection
            {...props}
            heading={'Base'}
            components={baseComponents}
          ></NavLinkComponentsSection>

          <NavLinkComponentsSection
            {...props}
            heading={'Feedback'}
            components={feedbackComponents}
          ></NavLinkComponentsSection>

          <NavLinkComponentsSection
            {...props}
            heading={'Navigation'}
            components={navigationComponents}
          ></NavLinkComponentsSection>

          <NavLinkComponentsSection
            {...props}
            heading={'Inputs'}
            components={inputComponents}
          ></NavLinkComponentsSection>

          <NavLinkComponentsSection
            {...props}
            heading={'Layout'}
            components={layoutComponents}
          ></NavLinkComponentsSection>

          <NavLinkComponentsSection
            {...props}
            heading={'Data Display'}
            components={dataDisplayComponents}
          ></NavLinkComponentsSection>

          <NavLinkComponentsSection
            {...props}
            heading={'Utilities'}
            components={utilityComponents}
          ></NavLinkComponentsSection>
        </>
      </ExpanderItem>
      <ExpanderItem
        title={<ExpanderTitle Icon={MdWebAssetOff} text="Legacy components" />}
        value="legacy"
      >
        {legacyComponents.map(({ label, ...rest }) => (
          <NavLink key={label} {...rest} onClick={props.onClick}>
            {label}
          </NavLink>
        ))}
      </ExpanderItem>
      <ExpanderItem
        title={<ExpanderTitle Icon={MdOutlineAutoAwesome} text="Theming" />}
        value="theming"
      >
        {theming.map(({ label, ...rest }) => (
          <NavLink key={label} {...rest} onClick={props.onClick}>
            {label}
          </NavLink>
        ))}
      </ExpanderItem>
      <ExpanderItem
        title={<ExpanderTitle Icon={MdOutlineArticle} text="Guides" />}
        value="guides"
      >
        {guides.map(({ label, ...rest }) => (
          <NavLink {...rest} key={label} onClick={props.onClick}>
            {label}
          </NavLink>
        ))}
      </ExpanderItem>
    </Expander>
  );
};

export const Sidebar = ({ expanded, setExpanded, platform }) => {
  const onClick = () => setExpanded(false);
  return (
    <nav
      aria-label="Main navigation"
      id="docs-sidebar"
      className={`docs-sidebar ${expanded ? 'expanded' : 'collapsed'}`}
    >
      <div className="docs-sidebar-overlay" onClick={onClick} />
      <div className="docs-sidebar-inner">
        <Flex direction="column" className="docs-sidebar-nav">
          <Flex
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <LogoLink platform={platform} onClick={onClick} />
            <MenuButton expanded={expanded} setExpanded={setExpanded} />
          </Flex>

          <FrameworkChooser onClick={onClick} />

          <SecondaryNav onClick={onClick} />

          <Divider size="small" />

          <ALink href="https://docs.amplify.aws" isExternal>
            <Flex as="span" direction="row">
              Amplify Docs
              <MdOpenInNew />
            </Flex>
          </ALink>
        </Flex>
      </div>
    </nav>
  );
};
