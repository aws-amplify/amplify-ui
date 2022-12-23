import { useRef } from 'react';
import classNames from 'classnames';
import { Heading, Link, Text, Flex, View } from '@aws-amplify/ui-react';
import {
  MdInvertColors,
  MdKeyboard,
  MdLabel,
  MdSmartButton,
  MdAccessibilityNew,
} from 'react-icons/md';

import { HomeCTA } from '../HomeCTA';
import { HomeFeatureCard } from '../HomeFeatureCard';
import { useIntersectionObserver } from '@/components/useIntersection';
import { trackScroll } from '@/utils/track';

export const A11ySection = ({ platform }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) {
    trackScroll('Home#Accessibility');
  }

  return (
    <View
      ref={ref}
      as="section"
      id="accessibility"
      className={classNames(
        'docs-home-section',
        'fade-in',
        isVisible && 'shown'
      )}
    >
      <Flex
        direction="column"
        className="docs-home-subsection--thin"
        textAlign="center"
      >
        <Heading
          level={2}
          className={classNames('expand-out', isVisible && 'shown')}
        >
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
          best practices to ensure <em>all</em> users can use your application.
        </Text>
        <Flex
          direction={{
            base: 'column',
            large: 'row',
          }}
          wrap="wrap"
          gap="xxl"
        >
          <HomeFeatureCard
            minWidth="40%"
            title="Color contrast"
            icon={MdInvertColors}
          >
            All components have AA or higher contrast in both light and dark
            mode
          </HomeFeatureCard>
          <HomeFeatureCard
            minWidth="40%"
            title="Keyboard navigation"
            icon={MdKeyboard}
          >
            Interactive components support keyboard navigation users would
            expect
          </HomeFeatureCard>
          <HomeFeatureCard
            minWidth="40%"
            title="Focus management"
            icon={MdSmartButton}
          >
            Focusable components have proper focus states and interactivity
          </HomeFeatureCard>
          <HomeFeatureCard
            minWidth="40%"
            title="Accessible labels"
            icon={MdLabel}
          >
            Form fields and icons have accessible labels, plus there are
            utilities to help make sure your application is labelled.
          </HomeFeatureCard>
        </Flex>

        <HomeCTA href={`/${platform}/getting-started/accessibility`}>
          <span>View our accessibility guidelines</span>
          <MdAccessibilityNew />
        </HomeCTA>
      </Flex>
    </View>
  );
};
