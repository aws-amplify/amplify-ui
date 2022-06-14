import { Link, Text, Flex, View, Button } from '@aws-amplify/ui-react';

import { DISCORD, GITHUB_REPO, TERMS, PRIVACY } from '@/data/links';
import { Logo } from '@/components/Logo';
import { DiscordIcon, GithubIcon } from '../Icons';

export const Footer = () => {
  return (
    <Flex as="footer" direction="column" className="docs-footer">
      <Flex direction="row" justifyContent="center">
        <Logo />
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        direction={{ base: 'column', medium: 'row' }}
        gap="xs"
      >
        <Button
          as={Link}
          variation="link"
          href={GITHUB_REPO}
          isExternal
          gap="xs"
        >
          <GithubIcon ariaLabel="" />
          Contribute on Github
        </Button>
        <Button as={Link} variation="link" href={DISCORD} isExternal gap="xs">
          <DiscordIcon ariaLabel="" />
          Discuss on Discord
        </Button>
      </Flex>
      <View fontSize="small">
        <Text>
          Amplify open source software, documentation and community are
          supported by Amazon Web Services.
        </Text>
        <Text>
          {' '}
          © {new Date().getFullYear()} Amazon Web Services, Inc. and its
          affiliates. All rights reserved. View the{' '}
          <Link isExternal href={TERMS}>
            site terms
          </Link>{' '}
          and{' '}
          <Link isExternal href={PRIVACY}>
            privacy policy
          </Link>
          .
        </Text>
        <Text marginBlockStart="medium">
          Flutter and the related logo are trademarks of Google LLC. We are not
          endorsed by or affiliated with Google LLC.
        </Text>
      </View>
    </Flex>
  );
};
