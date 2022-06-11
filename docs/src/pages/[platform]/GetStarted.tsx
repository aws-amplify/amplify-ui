import NextLink from 'next/link';
import {
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';

export const GetStartedSection = ({ platform }) => {
  const { tokens } = useTheme();

  return (
    <View as="section" className="docs-home-section">
      <Heading level={2}>Get started with popular frameworks</Heading>
      <Flex
        className="container"
        direction={{
          base: 'column',
          large: 'row',
        }}
      ></Flex>
    </View>
  );
};
