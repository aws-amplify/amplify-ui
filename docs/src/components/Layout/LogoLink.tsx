import NextLink from 'next/link';

interface LogoLinkProps {
  platform: string;
  onClick?: () => void;
}

export const LogoLink = ({ platform, onClick }: LogoLinkProps) => {
  return (
    <NextLink href={`/${platform}`} passHref legacyBehavior>
      <a onClick={onClick} className="docs-logo-link">
        Amplify UI
      </a>
    </NextLink>
  );
};
