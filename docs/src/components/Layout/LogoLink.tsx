import NextLink from 'next/link';

import { VisuallyHidden, Text } from '@aws-amplify/ui-react';

import { Logo } from '../Logo';
import { AmplifyIcon } from '../Icons';

interface LogoLinkProps {
  platform: string;
  onClick?: () => void;
}

export const LogoLink = ({ platform, onClick }: LogoLinkProps) => {
  return (
    <NextLink href={`/${platform}`} passHref legacyBehavior>
      <a onClick={onClick} className="docs-logo-link">
        Amplify UI
        <VisuallyHidden>Amplify UI Home</VisuallyHidden>
        {/* <AmplifyIcon color="primary.60" />{' '} */}
        {/* <Text as="span" fontWeight="medium">
          Amplify
        </Text>{' '}
        UI */}
      </a>
    </NextLink>
  );
};
