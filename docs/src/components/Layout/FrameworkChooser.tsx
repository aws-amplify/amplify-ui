import { Flex, Button } from '@aws-amplify/ui-react';
import { capitalize } from 'lodash';
import Link from 'next/link';

import { useCustomRouter } from '@/components/useCustomRouter';
import { FRAMEWORKS } from '@/data/frameworks';
import metaData from '@/data/pages.preval';
import { FrameworkLogo } from '@/components/Logo';

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
        <FrameworkLogo framework={framework} className="docs-framework-img" />
        {capitalize(framework)}
      </Button>
    </Link>
  );
};

interface FrameworkChooserProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FrameworkChooser = ({ onClick }: FrameworkChooserProps) => {
  const { pathname } = useCustomRouter();

  const {
    frontmatter: { supportedFrameworks = 'react' },
  } = metaData[pathname];
  const frameworksOptions =
    supportedFrameworks === 'all' ? FRAMEWORKS : supportedFrameworks.split('|');

  return (
    <Flex className="docs-framework-chooser">
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
