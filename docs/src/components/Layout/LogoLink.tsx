import Link from 'next/link';

import { VisuallyHidden } from '@aws-amplify/ui-react';

import { Logo } from '../Logo';

interface LogoLinkProps {
  platform: string;
  onClick?: () => void;
}

export const LogoLink = ({ platform, onClick }: LogoLinkProps) => {
  return (
    <Link href={`/${platform}`} passHref>
      <a onClick={onClick} className="docs-logo-link">
        <VisuallyHidden>Amplify UI Home</VisuallyHidden>
        <Logo />
      </a>
    </Link>
  );
};
