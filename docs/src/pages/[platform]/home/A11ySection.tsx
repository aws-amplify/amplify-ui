import * as React from 'react';
import { Heading, Link, Text, Flex, View } from '@aws-amplify/ui-react';
import {
  MdInvertColors,
  MdKeyboard,
  MdLabel,
  MdSmartButton,
  MdAccessibilityNew,
} from 'react-icons/md';

import { HomeCTA } from './HomeCTA';
import { HomeFeatureCard } from './HomeFeatureCard';
import { useIntersectionObserver } from '@/components/useIntersection';

export const A11ySection = ({ platform }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <View
      ref={ref}
      as="section"
      className={`docs-home-section fade-in ${isVisible ? 'shown' : ''}`}
    >
      <Flex direction="column" className="docs-home-subsection--thin">
        <Heading level={2}>
          <strong>Accessibility</strong> built-in
        </Heading>
        <Text className="docs-home-text">
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
        <Flex
          direction={{
            base: 'column',
            large: 'row',
          }}
        >
          <HomeFeatureCard
            title="Color contrast"
            Icon={MdInvertColors}
            description=""
          />
          <HomeFeatureCard
            title="Keyboard navigation"
            Icon={MdKeyboard}
            description=""
          />
          <HomeFeatureCard
            title="Focus management"
            Icon={MdSmartButton}
            description=""
          />
          <HomeFeatureCard
            title="Accessible labels"
            Icon={MdLabel}
            description=""
          />
        </Flex>

        <HomeCTA href={`${platform}/getting-started/accessibility`}>
          <span>View our accessibility guidelines</span>
          <MdAccessibilityNew />
        </HomeCTA>
      </Flex>
    </View>
  );
};
