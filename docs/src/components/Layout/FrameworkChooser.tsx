import { Flex, Image, Button, useTheme } from '@aws-amplify/ui-react';

import { capitalize } from 'lodash';
import { useCustomRouter } from '@/components/useCustomRouter';
import Link from 'next/link';
import { FRAMEWORKS } from '@/data/frameworks';
import metaData from '@/data/pages.preval';

interface FrameworkLinkProps extends FrameworkChooserProps {
  framework: string;
  isDisabled: boolean;
}

const platformPath = '[platform]';

const FrameworkLink = ({
  framework,
  onClick,
  isDisabled,
}: FrameworkLinkProps) => {
  const { pathname, query } = useCustomRouter();
  const isCurrent = query.platform === framework;
  const classNames = `docs-framework-link ${isCurrent ? 'current' : ''}`;
  const href = pathname.includes(platformPath)
    ? pathname.replace(platformPath, framework)
    : `/${framework}`;

  return (
    <Link href={href} passHref>
      <Button
        size="small"
        className={classNames}
        onClick={onClick}
        isDisabled={isDisabled}
      >
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
  const { pathname } = useCustomRouter();
  const { tokens } = useTheme();
  const {
    frontmatter: { supportedFrameworks = 'react' },
  } = metaData[pathname];
  const frameworksOptions =
    supportedFrameworks === 'all' ? FRAMEWORKS : supportedFrameworks.split('|');

  return (
    <Flex direction="column" gap={tokens.space.xs}>
      {FRAMEWORKS.map((framework) => (
        <FrameworkLink
          key={framework}
          framework={framework}
          onClick={onClick}
          isDisabled={!frameworksOptions.includes(framework)}
        />
      ))}
    </Flex>
  );
};
