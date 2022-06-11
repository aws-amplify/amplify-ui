import { HomeCTA } from '@/components/Home/HomeCTA';
import {
  Flex,
  Heading,
  Link,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';

export const A11ySection = ({ platform }) => {
  const { tokens } = useTheme();

  return (
    <View as="section" className="docs-home-section">
      <View className="docs-home-container">
        <Heading level={2} textAlign="center">
          <strong>Accessibility</strong> built-in
        </Heading>
        <Text className="docs-home-description">
          Amplify UI components follow{' '}
          <Link
            isExternal
            href="https://www.w3.org/WAI/standards-guidelines/wcag/"
          >
            WCAG
          </Link>{' '}
          and{' '}
          <Link isExternal href="https://www.w3.org/WAI/ARIA/apg/">
            WAI-ARIA
          </Link>{' '}
          best practices and guidelines such as color contrast, keyboard
          navigation, accessible labels, and focus management.
        </Text>
        <HomeCTA href={`${platform}/getting-started/accessibility`}>
          View our accessibility guidelines
        </HomeCTA>
      </View>
    </View>
  );
};
