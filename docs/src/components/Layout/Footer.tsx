import { Icon, Link, Text, Flex, View, useTheme } from '@aws-amplify/ui-react';

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
      <Flex
        justifyContent="center"
        alignItems="center"
        direction={{ base: 'column', medium: 'row' }}
        gap={tokens.space.xs}
      >
        <Link
          href="https://github.com/aws-amplify/amplify-ui"
          isExternal={true}
        >
          <Flex
            as="span"
            alignItems="baseline"
            justifyContent="center"
            display="flex"
            gap={tokens.space.xs}
          >
            <Icon ariaLabel="Github" pathData={icons.GITHUB} />
            Contribute on Github
          </Flex>
        </Link>
        <Link href="https://discord.gg/amplify" isExternal={true}>
          <Flex
            as="span"
            alignItems="baseline"
            justifyContent="center"
            display="flex"
            gap={tokens.space.xxs}
          >
            <Icon
              ariaLabel=""
              viewBox={{ minX: 0, minY: 0, width: 245, height: 240 }}
              pathData={icons.DISCORD}
            />
            Discuss on Discord
          </Flex>
        </Link>
      </Flex>
      <View fontSize={tokens.fontSizes.small}>
        <Text>
          Amplify open source software, documentation and community are
          supported by Amazon Web Services.
        </Text>
        <Text>
          {' '}
          © {new Date().getFullYear()} Amazon Web Services, Inc. and its
          affiliates. All rights reserved. View the{' '}
          <Link isExternal={true} href={links.TERMS}>
            site terms
          </Link>{' '}
          and{' '}
          <Link isExternal={true} href={links.PRIVACY}>
            privacy policy
          </Link>
          .
        </Text>
        <Text marginBlockStart={tokens.space.medium}>
          Flutter and the related logo are trademarks of Google LLC. We are not
          endorsed by or affiliated with Google LLC.
        </Text>
      </View>
    </Flex>
  );
};
