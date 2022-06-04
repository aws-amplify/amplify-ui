import {
  Flex,
  Heading,
  Link,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';

export const A11ySection = () => {
  const { tokens } = useTheme();

  return (
    <View
      as="section"
      className="docs-home-section"
      backgroundColor={tokens.colors.background.secondary}
    >
      <Flex
        className="container"
        direction={{
          base: 'column',
          large: 'row',
        }}
      >
        <View flex="1">
          <Heading level={2}>Accessibility</Heading>
          <Text className="docs-home-description">
            Amplify UI components follow{' '}
            <Link
              isExternal
              href="https://www.w3.org/WAI/standards-guidelines/wcag/"
            >
              WCAG
            </Link>{' '}
            and{' '}
            <Link isExternal href="https://www.w3.org/TR/wai-aria-1.2/">
              WAI-ARIA
            </Link>{' '}
            best practices and guidelines such as color contrast, keyboard
            navigation, accessible labels, and focus management.
          </Text>
        </View>
        <View flex="1"></View>
      </Flex>
    </View>
  );
};
