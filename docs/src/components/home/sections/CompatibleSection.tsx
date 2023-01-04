import { Flex, Heading, View } from '@aws-amplify/ui-react';
import classNames from 'classnames';
import { SiTypescript } from 'react-icons/si';
import { MdOutlineFlashOff, MdOutlineSupport } from 'react-icons/md';

import { HomeCTA } from '@/components/home/HomeCTA';
import { HomeFeatureCard } from '@/components/home/HomeFeatureCard';
import { useIntersectionObserver } from '@/components/useIntersection';
import { useRef } from 'react';
import { trackScroll } from '@/utils/track';

export const CompatibleSection = ({ platform }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) {
    trackScroll('Home#Compatible');
  }
  return (
    <View
      ref={ref}
      as="section"
      id="compatible"
      className={classNames(
        'docs-home-section',
        'fade-in',
        isVisible && 'shown'
      )}
    >
      <Flex direction="column" className="docs-home-subsection">
        <Heading
          level={2}
          textAlign="center"
          className={classNames('expand-out', isVisible && 'shown')}
        >
          <strong>Compatible</strong> with your front-end
        </Heading>
        <Flex
          direction={{
            base: 'column',
            large: 'row',
          }}
          gap="xxl"
        >
          <HomeFeatureCard icon={MdOutlineSupport} title="Escape hatches">
            Connected components like the Authenticator have headless, or
            UI-less, implementations that handle complex state management and
            leave the UI up to you.
          </HomeFeatureCard>
          {platform === 'react-native' ? null : (
            <HomeFeatureCard icon={MdOutlineFlashOff} title="Styling optional">
              Don&lsquo;t like our style? Throw it out and use your own! Amplify
              UI components use plain CSS so you have complete control over the
              styling.
            </HomeFeatureCard>
          )}

          <HomeFeatureCard
            icon={SiTypescript}
            title="TypeScript & IntelliSense"
          >
            Let your IDE do the work for you and make UI development a breeze
            with strongly typed interfaces and inline documentation.
          </HomeFeatureCard>
        </Flex>
        <HomeCTA href={`/${platform}/getting-started/introduction`}>
          Learn more about Amplify UI&lsquo;s design philosophy
        </HomeCTA>
      </Flex>
    </View>
  );
};
