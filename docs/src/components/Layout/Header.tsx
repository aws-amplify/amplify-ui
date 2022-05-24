import * as React from 'react';
import Link from 'next/link';
import LinkButton from './LinkButton';
import { Button, Flex, Image, VisuallyHidden } from '@aws-amplify/ui-react';
import { MdClose, MdMenu } from 'react-icons/md';

import { Logo } from '@/components/Logo';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Sidebar } from './Sidebar';

export const Header = ({
  expanded,
  setExpanded,
  colorMode,
  setColorMode,
  platform,
}) => {
  return (
    <Flex as="header" className="docs-header">
      <div className="docs-header-bg" />

      <Button
        size="small"
        aria-expanded={expanded}
        aria-controls="docs-sidebar"
        className="docs-header-menu-button"
        onClick={() => setExpanded(!expanded)}
      >
        <VisuallyHidden>Menu</VisuallyHidden>
        {expanded ? (
          <MdClose style={{ height: '1.5rem' }} />
        ) : (
          <MdMenu style={{ height: '1.5rem' }} />
        )}
      </Button>

      <Sidebar
        expanded={expanded}
        setExpanded={setExpanded}
        platform={platform}
      />

      <Link href={`/${platform}`} passHref>
        <LinkButton classNames="docs-logo-link">
          <Logo />
        </LinkButton>
      </Link>
      <Image
        alt={platform}
        height="1.5rem"
        width="1.5rem"
        display="block"
        src={`/svg/integrations/${platform}.svg`}
      />

      <Flex flex="1" justifyContent="flex-end">
        <ColorModeSwitcher colorMode={colorMode} setColorMode={setColorMode} />
      </Flex>
    </Flex>
  );
};
