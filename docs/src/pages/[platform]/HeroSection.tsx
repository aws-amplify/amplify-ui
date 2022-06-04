import { Copy } from '@/components/Copy';
import { FrameworkChooser } from '@/components/Layout/FrameworkChooser';
import { useCustomRouter } from '@/components/useCustomRouter';
import { FRAMEWORKS } from '@/data/frameworks';
import {
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { HomeLogo } from '../HomeLogo';

export const HeroSection = () => {
  const { tokens } = useTheme();
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  const installScripts = {
    react: `npm i @aws-amplify/ui-${platform} aws-amplify`,
    vue: `npm i @aws-amplify/ui-${platform} aws-amplify`,
    angular: `npm i @aws-amplify/ui-${platform} aws-amplify`,
    flutter: 'flutter pub add amplify_authenticator',
  };
  const frameworkInstallScript = installScripts[platform.toString()];

  return (
    <View as="section" className="container">
      <Heading level={1}>Build complex UI faster</Heading>

      <Flex
        direction={{ base: 'column', medium: 'row' }}
        padding={tokens.space.large}
      >
        <Card flex="1">
          <Text
            fontSize={{
              base: tokens.fontSizes.large,
              small: tokens.fontSizes.xl,
            }}
          >
            Amplify UI is an open-source design system with cloud-connected
            components and primitives that simplify building accessible,
            performant, and beautiful applications in React, Angular, Vue, and
            Flutter (more coming soon).
          </Text>

          <Flex
            direction={{ base: 'column-reverse', medium: 'row' }}
            padding={`${tokens.space.medium} 0 0 0`}
          >
            <Button
              size="large"
              variation="primary"
              as="a"
              href={`/${platform}/getting-started/installation`}
            >
              Get started
            </Button>
            <View className="install-code__container">
              <code className="install-code__content">
                {frameworkInstallScript}
              </code>
              <Copy
                className="install-code__button"
                size=""
                variation="link"
                text={frameworkInstallScript}
              />
            </View>
          </Flex>
        </Card>
      </Flex>

      <FrameworkChooser />
    </View>
  );
};
