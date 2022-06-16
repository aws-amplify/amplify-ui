import * as React from 'react';
import dynamic from 'next/dynamic';
import { MdOutlineWidgets } from 'react-icons/md';
import { Heading, useBreakpointValue, Text, View } from '@aws-amplify/ui-react';
import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';
import { useIntersectionObserver } from '@/components/useIntersection';

// react-live does not work with SSR so we have to load
// it dynamically and only in the client
const HomeEditor = dynamic(() => import('./HomeEditor'), {
  ssr: false,
}) as React.FC<any>;

export const LiveSection = ({ platform, ...rest }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;

  return (
    <View as="section" className="docs-home-section docs-grid-bg" ref={ref}>
      <View className="docs-home-subsection">
        <Heading
          level={2}
          textAlign="center"
          className={`fade-in ${isVisible ? 'shown' : ''}`}
        >
          Still not convinced? Try it out below!
        </Heading>
      </View>

      <View className="docs-home-subsection">
        <HomeEditor />
      </View>
    </View>
  );
};
