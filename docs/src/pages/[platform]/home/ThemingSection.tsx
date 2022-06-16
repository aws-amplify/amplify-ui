import * as React from 'react';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { Heading, View, Text, Flex } from '@aws-amplify/ui-react';
import { ThemeSwitcher } from 'src/pages/[platform]/home/ThemeSwitcher';
import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';
import { useIntersectionObserver } from '@/components/useIntersection';

export const ThemingSection = ({ colorMode, platform }) => {
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
      className={`docs-home-section docs-gradient-bg fade-in ${
        isVisible ? 'shown' : ''
      }`}
    >
      <Flex
        direction="column"
        className="docs-home-subsection--thin"
        textAlign="center"
      >
        <Heading level={2}>
          <strong>Theming</strong> controls to match your brand
        </Heading>
        <Text className="docs-home-text">
          Create a unique look-and-feel for your application in minutes. Amplify
          UI uses design tokens and plain CSS so every detail can be customized.
          Dynamic theming for dark mode, responsive, and user preferences is
          easy with theme overrides.
        </Text>
      </Flex>
      <ThemeSwitcher colorMode={colorMode} />
      <HomeCTA href={`${platform}/theming`}>
        <span>Learn more about theming</span>
        <MdOutlineAutoAwesome />
      </HomeCTA>
    </View>
  );
};
