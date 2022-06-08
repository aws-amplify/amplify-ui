import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  Authenticator,
  Button,
  Card,
  Flex,
  Heading,
  IconChevronRight,
  Text,
  ToggleButton,
  ToggleButtonGroup,
  View,
  useTheme,
  useBreakpointValue,
} from '@aws-amplify/ui-react';

// react-live does not work with SSR so we have to load
// it dynamically and only in the client
const HomeEditor = dynamic(() => import('../HomeEditor'), { ssr: false });

import { HomePrimitivePreview } from '../HomePrimitivePreview';
import { ThemeButton } from '../ThemeButton';
import { useCustomRouter } from '@/components/useCustomRouter';
import { A11ySection } from './A11ySection';
import { ThemeSwitcher } from '@/components/Home/ThemeSwitcher';

const ReactHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();
  const { tokens } = useTheme();
  const showEditor = useBreakpointValue({
    base: false,
    medium: true,
  });
  const [themeOverride, setThemeOverride] = React.useState('');

  return (
    <>
      {showEditor ? (
        <View
          backgroundColor={tokens.colors.background.secondary}
          padding={tokens.space.large}
        >
          <Heading level={2} textAlign="center" margin={tokens.space.large}>
            Take it for a test drive
          </Heading>
          <View className="container">
            <Card style={{ width: '100%', padding: 0 }} variation="outlined">
              <HomeEditor />
            </Card>
          </View>
        </View>
      ) : null}

      <View as="section" className="docs-home-section container">
        <Flex
          direction={{
            base: 'column-reverse',
            large: 'row',
          }}
        >
          <View flex="1" className="example">
            <Authenticator
              socialProviders={['amazon', 'apple', 'facebook', 'google']}
            />
          </View>
          <Flex flex="1" direction="column" alignItems="flex-start">
            <Heading level={2}>Cloud-Connected Components</Heading>
            <Text className="docs-home-description">
              Simplify complex cloud-connected workflows like authentication
              with minimal boilerplate code.
            </Text>
            <Button
              as="a"
              size="large"
              href={`/${platform}/components/authenticator`}
              isFullWidth
            >
              Authenticator
              <IconChevronRight />
            </Button>
          </Flex>
        </Flex>
      </View>

      <View
        as="section"
        className="docs-home-section"
        backgroundColor={tokens.colors.background.secondary}
      >
        <Flex flex="1" direction="column" alignItems="flex-start">
          <Heading level={2}>Theming</Heading>
          <ThemeSwitcher colorMode={colorMode} />
        </Flex>
      </View>

      <View as="section" className="docs-home-section">
        <Flex
          className="container"
          direction={{
            base: 'column',
            large: 'row',
          }}
          gap={tokens.space.xxl}
        >
          <View maxWidth="100%" overflow="hidden">
            <HomePrimitivePreview />
          </View>
          <Flex flex="1" direction="column" alignItems="flex-start">
            <Heading level={2}>Primitive Components</Heading>
            <Text className="docs-home-description">
              Primitive components that create consistency across Amplify UI and
              allow you to build complete applications that fit your brand, like
              Buttons and Badges.
            </Text>
            <Button
              as="a"
              size="large"
              href={`/${platform}/components/authenticator`}
            >
              Get started with components
              <IconChevronRight />
            </Button>
          </Flex>
        </Flex>
      </View>

      <A11ySection />
    </>
  );
};

export default ReactHomePage;
