import * as React from 'react';
import { MdOutlineAutoAwesome } from 'react-icons/md';
import { Heading, View } from '@aws-amplify/ui-react';
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
    <View ref={ref} as="section" className="docs-home-section docs-gradient-bg">
      <Heading
        level={2}
        textAlign="center"
        className={`fade-in ${isVisible ? 'shown' : ''}`}
      >
        <strong>Theming</strong> controls to match your brand
      </Heading>
      <ThemeSwitcher colorMode={colorMode} />
      <HomeCTA href={`${platform}/theming`}>
        <span>Learn more about theming</span>
        <MdOutlineAutoAwesome />
      </HomeCTA>
    </View>
  );
};
