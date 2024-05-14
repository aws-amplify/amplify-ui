import * as React from 'react';
import { useRouter } from 'next/router';
import {
  MdOutlineChecklist,
  MdOutlineWidgets,
  MdOutlineAutoAwesome,
  MdWebAssetOff,
  MdOutlineArticle,
  MdOutlinePower,
} from 'react-icons/md';
import {
  Text,
  Flex,
  Collection,
  Accordion,
  useTheme,
} from '@aws-amplify/ui-react';
import {
  ComponentNavItem,
  connectedComponents,
  guides,
  theming,
  gettingStarted,
  primitiveComponents,
} from '../../data/links';

import NextLink from 'next/link';
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
    {({ href, label, tertiary }) => (
      <NavLink key={label} href={href} tertiary={tertiary} onClick={onClick}>
        {label}
      </NavLink>
    )}
  </Collection>
);

const NavLink = ({
  href,
  children,
  onClick,
  tertiary = false,
  platforms = [],
}) => {
  const {
    query: { platform = 'react' },
    pathname,
  } = useRouter();
  const isCurrent = pathname.replace('/[platform]', '') === href;
  const classNames = `${
    tertiary ? 'docs-tertiary-nav-link' : 'docs-secondary-nav-link'
  } ${isCurrent ? 'current' : ''}`;

  if (platforms.length && !platforms.includes(platform)) {
    return null;
  }

  return (
    <NextLink href={`/${platform}${href}`} passHref legacyBehavior>
      <a onClick={onClick} className={classNames}>
        {children}
      </a>
    </NextLink>
  );
};

const NavLinkComponentsSection = ({ heading, components, ...props }) => {
  const { query } = useRouter();
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
      {heading ? (
        <Text
          fontSize={tokens.fontSizes.xs}
          fontWeight={tokens.fontWeights.semibold}
          textTransform="uppercase"
          letterSpacing="0.125em"
          color={tokens.colors.font.tertiary}
          padding={`${tokens.space.large} ${tokens.space.medium} ${tokens.space.xs} var(--secondary-nav-indent)`}
        >
          {heading}
        </Text>
      ) : null}
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
      padding={`${tokens.space.small} ${tokens.space.xs}`}
    >
      <Icon
        style={{
          height: tokens.fontSizes.large,
          width: tokens.fontSizes.large,
        }}
        color={tokens.colors.primary[60]}
      />
      <Text as="span">{text}</Text>
    </Flex>
  );
};

// TODO: clean up this logic
const SecondaryNav = (props) => {
  const { pathname } = useRouter();
  const { platform } = props;
  // Extract section from URL (/section/... => section)
  let section = pathname.split('/')[2];
  const [value, setValue] = React.useState([section]);

  const isFlutter = platform === 'flutter';
  const isReactNative = platform === 'react-native';
  const isAndroid = platform === 'android';
  const isSwift = platform === 'swift';
  const isAngular = platform === 'angular';
  const isVue = platform === 'vue';

  const hideTheming = isAndroid || isSwift;
  const hideGuidesExpander =
    isFlutter || isReactNative || isAndroid || isSwift || isAngular || isVue;

  return (
    <Accordion.Container value={value} onValueChange={setValue}>
      {
        <Accordion.Item value="getting-started">
          <Accordion.Trigger>
            <ExpanderTitle Icon={MdOutlineChecklist} text="Getting started" />
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>
            {gettingStarted.map(({ label, ...rest }) => (
              <NavLink key={label} {...rest} onClick={props.onClick}>
                {label}
              </NavLink>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      }
      {platform === 'react' ? (
        <Accordion.Item value="components">
          <Accordion.Trigger>
            <ExpanderTitle Icon={MdOutlineWidgets} text="Components" />
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>
            {primitiveComponents.map(({ heading, components }, i) => (
              <NavLinkComponentsSection
                {...props}
                key={heading || i}
                heading={heading}
                components={components}
              />
            ))}
          </Accordion.Content>
        </Accordion.Item>
      ) : null}

      <Accordion.Item value="connected-components">
        <Accordion.Trigger>
          <ExpanderTitle Icon={MdOutlinePower} text="Connected components" />
          <Accordion.Icon />
        </Accordion.Trigger>
        <Accordion.Content>
          {connectedComponents.map(({ label, href, ...rest }) => (
            <NavLink key={href} href={href} {...rest} onClick={props.onClick}>
              {label}
            </NavLink>
          ))}
        </Accordion.Content>
      </Accordion.Item>

      {/* Android and Swift don't have theming at this time */}
      {hideTheming ? null : (
        <Accordion.Item value="theming">
          <Accordion.Trigger>
            <ExpanderTitle Icon={MdOutlineAutoAwesome} text="Theming" />
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>
            {theming.map(({ label, ...rest }) => (
              <NavLink key={label} {...rest} onClick={props.onClick}>
                {label}
              </NavLink>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      )}

      {/* Flutter, React Native, Android, and Swift don't have guides at this time */}
      {hideGuidesExpander ? null : (
        <Accordion.Item value="guides">
          <Accordion.Trigger>
            <ExpanderTitle Icon={MdOutlineArticle} text="Guides" />
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>
            {guides.map(({ label, ...rest }) => (
              <NavLink {...rest} key={label} onClick={props.onClick}>
                {label}
              </NavLink>
            ))}
          </Accordion.Content>
        </Accordion.Item>
      )}
    </Accordion.Container>
  );
};

export const Sidebar = ({ expanded, setExpanded, platform }) => {
  const onClick = () => setExpanded(false);
  return (
    <aside
      aria-label="Main navigation"
      id="docs-sidebar"
      className={`docs-sidebar ${expanded ? 'expanded' : 'collapsed'}`}
    >
      <div className="docs-sidebar-overlay" onClick={onClick} />
      <div className="docs-sidebar-inner">
        <Flex direction="column" className="docs-sidebar-nav">
          <Flex
            as="nav"
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <LogoLink platform={platform} onClick={onClick} />
            <MenuButton expanded={expanded} setExpanded={setExpanded} />
          </Flex>
          <FrameworkChooser onClick={onClick} />
          <SecondaryNav onClick={onClick} platform={platform} />
        </Flex>
      </div>
    </aside>
  );
};
