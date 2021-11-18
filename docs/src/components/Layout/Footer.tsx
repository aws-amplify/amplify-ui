import {
  Icon,
  Link,
  Text,
  Flex,
  View,
  useTheme,
  Button,
} from '@aws-amplify/ui-react';

import * as links from '@/data/links';
import * as icons from '@/data/icon';
import { Logo } from '@/components/Logo';

export const Footer = () => {
  const { tokens } = useTheme();
  return (
    <Flex as="footer" direction="column" className="docs-footer">
      <Flex direction="row" justifyContent="center">
        <Logo />
      </Flex>
      <View textAlign="center">
        <Button
          as="a"
          variation="link"
          gap={tokens.space.small}
          alignItems="baseline"
          href="https://github.com/aws-amplify/amplify-ui"
          isExternal={true}
          color={tokens.colors.font.tertiary}
        >
          <Icon ariaLabel="Github" pathData={icons.GITHUB} />
          Github
        </Button>
        <Button
          as="a"
          variation="link"
          gap={tokens.space.small}
          alignItems="baseline"
          isExternal={true}
          color={tokens.colors.font.tertiary}
        >
          <Icon
            viewBox={{ minX: 0, minY: 0, width: 245, height: 240 }}
            pathData={icons.DISCORD}
          />
          Discord
        </Button>
      </View>
      <Flex direction="row">
        <View>
          Amplify open source, documentation and community are supported by
          Amazon Web Services © {new Date().getFullYear()}, Amazon Web Services,
          Inc. and its affiliates. All rights reserved. View the{' '}
          <Link isExternal={true} href={links.TERMS}>
            site terms
          </Link>{' '}
          and{' '}
          <Link isExternal={true} href={links.PRIVACY}>
            privacy policy
          </Link>
          .
          <View margin={`${tokens.space.medium} 0 0 0`}>
            Flutter and the related logo are trademarks of Google LLC. We are
            not endorsed by or affiliated with Google LLC.
          </View>
        </View>
      </Flex>
    </Flex>
  );
};
