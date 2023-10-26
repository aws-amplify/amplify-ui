import NextLink from 'next/link';

import { VisuallyHidden } from '@aws-amplify/ui-react';

import { Logo } from '../Logo';

interface LogoLinkProps {
  platform: string;
  onClick?: () => void;
}

export const LogoLink = ({ platform, onClick }: LogoLinkProps) => {
  return (
    <NextLink href={`/${platform}`} passHref legacyBehavior>
      <a onClick={onClick} className="docs-logo-link">
        <VisuallyHidden>Amplify UI Home</VisuallyHidden>
        <Logo />
      </a>
    </NextLink>
  );
};
