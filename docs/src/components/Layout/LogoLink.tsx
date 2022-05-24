import Link from 'next/link';
import LinkButton from './LinkButton';

import { VisuallyHidden } from '@aws-amplify/ui-react';

import { Logo } from '../Logo';

interface LogoLinkProps {
  platform: string;
  onClick?: () => void;
}

export const LogoLink = ({ platform, onClick }: LogoLinkProps) => {
  return (
    <Link href={`/${platform}`} passHref>
      <LinkButton onClick={onClick} classNames="docs-logo-link">
        <VisuallyHidden>Amplify UI Home</VisuallyHidden>
        <Logo />
      </LinkButton>
    </Link>
  );
};
