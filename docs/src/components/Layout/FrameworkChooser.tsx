import { Flex, Image, Button, useTheme } from '@aws-amplify/ui-react';

import { capitalize } from 'lodash';
import { useCustomRouter } from '@/components/useCustomRouter';
import Link from 'next/link';
import { FRAMEWORKS } from '@/data/frameworks';

interface FrameworkLinkProps extends FrameworkChooserProps {
  platform: string;
}

const FrameworkLink = ({ platform, onClick }: FrameworkLinkProps) => {
  const { pathname, query } = useCustomRouter();

  const isCurrent = query.platform === platform;
  const classNames = `docs-framework-link ${isCurrent ? 'current' : ''}`;
  const href = pathname.includes('[platform]')
    ? pathname.replace('[platform]', platform)
    : `/${platform}`;

  return (
    <Link href={href} passHref>
      <Button as="a" size="small" className={classNames} onClick={onClick}>
        <Image
          alt=""
          height="1.25rem"
          width="1.25rem"
          display="block"
          src={`/svg/integrations/${platform}.svg`}
        />
        {capitalize(platform)}
      </Button>
    </Link>
  );
};

interface FrameworkChooserProps {
  onClick: () => void;
}

export const FrameworkChooser = ({ onClick }: FrameworkChooserProps) => {
  const { tokens } = useTheme();
  return (
    <Flex direction="column" gap={tokens.space.xs}>
      {FRAMEWORKS.map((framework) => (
        <FrameworkLink key={framework} platform={framework} onClick={onClick} />
      ))}
    </Flex>
  );
};
