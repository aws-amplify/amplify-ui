import { CopyButton } from '@/components/CopyButton';
import { FrameworkChooser } from '@/components/Layout/FrameworkChooser';
import { useCustomRouter } from '@/components/useCustomRouter';
import {
  Button,
  Flex,
  Heading,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';

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
    <View as="section" className="docs-hero">
      <Flex className="container" justifyContent="center" textAlign="center">
        <Flex
          direction="column"
          className="docs-home-container"
          justifyContent="stretch"
        >
          <Heading level={1} className="docs-home-h1">
            Build UI <strong>faster</strong>
          </Heading>
          <Text
            fontSize={{
              base: tokens.fontSizes.large,
              small: tokens.fontSizes.xl,
            }}
          >
            Amplify UI simplifies building accessible, performant, and beautiful
            applications with cloud-connected and primitive components, theming,
            and utilities.
          </Text>
          <FrameworkChooser />
          <Flex direction={{ base: 'column-reverse', medium: 'row' }}>
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
              <CopyButton
                className="install-code__button"
                variation="link"
                size="large"
                text={frameworkInstallScript}
              />
            </View>
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
};
