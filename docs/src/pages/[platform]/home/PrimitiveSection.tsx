import * as React from 'react';
import dynamic from 'next/dynamic';
import { MdOutlineWidgets } from 'react-icons/md';
import {
  Heading,
  useBreakpointValue,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';
import { useIntersectionObserver } from '@/components/useIntersection';

// react-live does not work with SSR so we have to load
// it dynamically and only in the client
const HomeEditor = dynamic(() => import('./HomeEditor'), { ssr: false });

export const PrimitiveSection = ({ platform, ...rest }) => {
  const { tokens } = useTheme();

  const showEditor = useBreakpointValue({
    base: false,
    medium: true,
  });

  const ref = React.useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <View
      as="section"
      className="docs-home-section docs-grid-bg centered"
      ref={ref}
    >
      <View className="docs-home-container">
        <Heading
          level={2}
          textAlign="center"
          className={`fade-in ${isVisible ? 'shown' : ''}`}
        >
          Speed up development with over <br />
          <strong>45 production-ready components</strong>
        </Heading>
      </View>

      {showEditor ? (
        <View className="docs-home-section">
          <HomeEditor />
        </View>
      ) : null}

      <View className="docs-home-container">
        <HomeCTA href={`/${platform}/components`}>
          <span>View all components</span>
          <MdOutlineWidgets />
        </HomeCTA>
      </View>
    </View>
  );
};
