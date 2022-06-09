import {
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';

export const FigmaSection = () => {
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
          <Heading level={2}>Build UIs visually in Figma</Heading>
          <Text className="docs-home-description">
            With Amplify Studio you can design components in Figma, bind them to
            your data, and generate production-ready React code. Amplify
            Studio's UI builder makes it easy to build UI that is connected to
            your data that is customizable and configurable in your codebase. Go
            from design to production-ready code in minutes and eliminate the
            design-development gap.
          </Text>
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
        <Button as="a" href="">
          Learn more about Figma integration
        </Button>
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
