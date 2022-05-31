import { Flex, Image, Button, useTheme } from '@aws-amplify/ui-react';

import { capitalize } from 'lodash';
import { useCustomRouter } from '@/components/useCustomRouter';
import Link from 'next/link';
import { FRAMEWORKS } from '@/data/frameworks';

interface FrameworkLinkProps extends FrameworkChooserProps {
  framework: string;
}

const platformPath = '[platform]';

const FrameworkLink = ({ framework, onClick }: FrameworkLinkProps) => {
  const { pathname, query } = useCustomRouter();

  const isCurrent = query.platform === framework;
  const classNames = `docs-framework-link ${isCurrent ? 'current' : ''}`;
  const href = pathname.includes(platformPath)
    ? pathname.replace(platformPath, framework)
    : `/${framework}`;

  return (
    <Link href={href} passHref>
      <Button as="a" size="small" className={classNames} onClick={onClick}>
        <Image
          alt={framework}
          height="1.25rem"
          width="1.25rem"
          display="block"
          src={`/svg/integrations/${framework}.svg`}
        />
        {capitalize(framework)}
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
        <FrameworkLink
          key={framework}
          framework={framework}
          onClick={onClick}
        />
      ))}
    </Flex>
  );
};
