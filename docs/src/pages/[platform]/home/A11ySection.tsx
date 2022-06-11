import * as React from 'react';
import { Heading, Link, Text, useTheme, View } from '@aws-amplify/ui-react';
import { IoAccessibility } from 'react-icons/io5';

import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';
import { useIntersectionObserver } from '@/utils/useIntersection';

export const A11ySection = ({ platform }) => {
  const { tokens } = useTheme();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <View ref={ref} as="section" className="docs-home-section">
      <View
        className={`docs-home-container fade-in ${isVisible ? 'shown' : ''}`}
      >
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
          <span>View our accessibility guidelines</span>
          <IoAccessibility />
        </HomeCTA>
      </View>
    </View>
  );
};
