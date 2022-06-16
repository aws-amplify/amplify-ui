import { Flex, Heading, View } from '@aws-amplify/ui-react';
import { SiTypescript } from 'react-icons/si';
import { MdOutlineFlashOff, MdOutlineSupport } from 'react-icons/md';

import { HomeCTA } from './HomeCTA';
import { HomeFeatureCard } from './HomeFeatureCard';
import { useIntersectionObserver } from '@/components/useIntersection';
import { useRef } from 'react';

export const CompatibleSection = ({ platform }) => {
  const ref = useRef<HTMLDivElement | null>(null);
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
        <Heading level={2} textAlign="center">
          <strong>Compatible</strong> with your front-end
        </Heading>
        <Flex
          direction={{
            base: 'column',
            large: 'row',
          }}
        >
          <HomeFeatureCard
            Icon={MdOutlineSupport}
            title="Escape hatches"
            description="Connected components like the Authenticator have headless, or UI-less, implementations that handle complex state management and leave the UI up to you."
          />
          <HomeFeatureCard
            Icon={MdOutlineFlashOff}
            title="Styling optional"
            description="Don't like our style? Throw it out and use your own! Amplify UI components use plain CSS so you have complete control over the styling."
          />
          <HomeFeatureCard
            Icon={SiTypescript}
            title="Typescript support"
            description=""
          />
        </Flex>
        <HomeCTA href={`/${platform}/getting-started/introduction`}>
          Learn more about Amplify UI's design philosophy
        </HomeCTA>
      </Flex>
    </View>
  );
};
