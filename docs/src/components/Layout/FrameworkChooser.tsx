import { Flex, Button } from '@aws-amplify/ui-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { FRAMEWORKS, FRAMEWORK_DISPLAY_NAMES } from '@/data/frameworks';
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
  const { pathname, query } = useRouter();
  const isCurrent = query.platform === framework;
  const classNames = `docs-framework-link ${isCurrent ? 'current' : ''}`;
  const href = pathname.includes(platformPath)
    ? pathname.replace(platformPath, framework)
    : `/${framework}`;

  const frameworkButton = (
    <Button
      size="small"
      as="a"
      className={classNames}
      onClick={onClick}
      isDisabled={isDisabled}
    >
      <FrameworkLogo framework={framework} className="docs-framework-img" />
      {FRAMEWORK_DISPLAY_NAMES[framework]}
    </Button>
  );

  return isDisabled ? (
    frameworkButton
  ) : (
    <Link href={href} passHref>
      {frameworkButton}
    </Link>
  );
};

interface FrameworkChooserProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const FrameworkChooser = ({ onClick }: FrameworkChooserProps) => {
  const { pathname } = useRouter();

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
