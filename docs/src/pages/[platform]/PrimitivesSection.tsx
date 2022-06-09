import Link from 'next/link';

import {
  Button,
  Flex,
  Heading,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';

export const PrimitivesSection = () => {
  const { tokens } = useTheme();

  return (
    <View as="section" className="docs-home-section">
      <Flex
        className="container"
        direction={{
          base: 'column',
          large: 'row',
        }}
      >
        <View flex="1">
          <Heading level={2}>
            Speed up development with over 45 production-ready components
          </Heading>
          <Text className="docs-home-description"></Text>
        </View>
        <View flex="1"></View>
      </Flex>
      <Flex
        direction={{
          base: 'column',
          large: 'row',
        }}
        justifyContent="center"
      >
        <Link href="/react/components" passHref>
          <Button as="a">View all React components</Button>
        </Link>

        <Button as="a" href="">
          Get the Figma file
        </Button>
        <Button as="a" href="">
          Get the Figma theming plugin
        </Button>
      </Flex>
    </View>
  );
};
