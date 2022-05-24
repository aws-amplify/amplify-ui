import { Flex, Image, useTheme } from '@aws-amplify/ui-react';

import { capitalize } from 'lodash';
import { useCustomRouter } from '@/components/useCustomRouter';
import Link from 'next/link';
import { FRAMEWORKS } from '@/data/frameworks';

import LinkButton from './LinkButton';

interface FrameworkLinkProps extends FrameworkChooserProps {
  platform: string;
}

const FrameworkLink = ({ platform, onClick }: FrameworkLinkProps) => {
  const router = useCustomRouter();
  const { pathname, query } = router;

  const isCurrent = query.platform === platform;
  const classNames = `docs-framework-link amplify-button amplify-button--small ${
    isCurrent ? 'current' : ''
  }`;
  const href = pathname.includes('[platform]')
    ? pathname.replace('[platform]', platform)
    : `/${platform}`;

  return (
    <Link href={href} passHref>
      <LinkButton classNames={classNames} onClick={onClick}>
        <Image
          alt=""
          height="1.25rem"
          width="1.25rem"
          display="block"
          src={`/svg/integrations/${platform}.svg`}
        />
        {capitalize(platform)}
      </LinkButton>
    </Link>
  );
};

interface FrameworkChooserProps {
  onClick?: () => void;
}

export const FrameworkChooser = ({ onClick }: FrameworkChooserProps) => {
  const { tokens } = useTheme();
  return (
    <Flex direction="column" gap={tokens.space.xs}>
      {FRAMEWORKS.map((framework) => (
        <FrameworkLink platform={framework} onClick={onClick} />
      ))}
    </Flex>
  );
};
