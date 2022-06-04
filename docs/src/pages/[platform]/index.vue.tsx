import * as React from 'react';

import {
  Authenticator,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Text,
  View,
  useTheme,
} from '@aws-amplify/ui-react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { A11ySection } from './A11ySection';

const VueHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();
  const { tokens } = useTheme();

  return (
    <>
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
            </Button>
          </Flex>
        </Flex>
      </View>

      <A11ySection />
    </>
  );
};

export default VueHomePage;
