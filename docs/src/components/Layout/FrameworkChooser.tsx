import { Flex, Image, Button } from '@aws-amplify/ui-react';

import { capitalize } from 'lodash';
import { useCustomRouter } from '@/components/useCustomRouter';
import Link from 'next/link';
import { FRAMEWORKS } from '@/data/frameworks';
import metaData from '@/data/pages.preval';
import {
  AngularLogo,
  FlutterLogo,
  FrameworkLogo,
  ReactLogo,
  VueLogo,
} from '../Logo';

interface FrameworkLinkProps extends FrameworkChooserProps {
  framework: string;
  isDisabled: boolean;
  test?: boolean;
}

const platformPath = '[platform]';

const FrameworkLink = ({
  framework,
  onClick,
  isDisabled,
  disableScroll,
}: FrameworkLinkProps) => {
  const { pathname, query, push } = useCustomRouter();
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
        onClick={(e) => {
          if (disableScroll) {
            e.preventDefault();
            push(href, null, { scroll: false });
          }
          if (onClick) {
            onClick(e);
          }
        }}
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
  disableScroll?: boolean;
}

export const FrameworkChooser = ({
  onClick,
  disableScroll = false,
}: FrameworkChooserProps) => {
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
          disableScroll={disableScroll}
          onClick={onClick}
          isDisabled={!frameworksOptions.includes(framework)}
        />
      ))}
    </Flex>
  );
};
