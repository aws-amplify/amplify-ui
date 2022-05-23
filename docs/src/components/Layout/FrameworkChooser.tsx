import { Flex, Image, useTheme } from '@aws-amplify/ui-react';

import { useCustomRouter } from '@/components/useCustomRouter';
import Link from 'next/link';

import LinkButton from './LinkButton';

const FrameworkLink = ({ platform, label }) => {
  const router = useCustomRouter();
  const { hash } = window.location;
  const { pathname, query } = router;

  const isCurrent = query.platform === platform;
  const classNames = `docs-framework-link amplify-button amplify-button--small ${
    isCurrent ? 'current' : ''
  }`;

  return (
    <Link href={pathname.replace('[platform]', platform)} passHref>
      <LinkButton classNames={classNames}>
        <Image
          alt=""
          height="1.25rem"
          width="1.25rem"
          display="block"
          src={`/svg/integrations/${platform}.svg`}
        />
        {label}
      </LinkButton>
    </Link>
  );
};

export const FrameworkChooser = () => {
  const { tokens } = useTheme();
  return (
    <Flex direction="column" gap={tokens.space.xs}>
      <FrameworkLink platform="react" label="React" />
      <FrameworkLink platform="angular" label="Angular" />
      <FrameworkLink platform="vue" label="Vue" />
      <FrameworkLink platform="flutter" label="Flutter" />
    </Flex>
  );
};
