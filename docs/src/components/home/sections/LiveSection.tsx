import { useRef } from 'react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import { Heading, View } from '@aws-amplify/ui-react';
import { useIntersectionObserver } from '@/components/useIntersection';
import { trackScroll } from '@/utils/track';

// react-live does not work with SSR so we have to load
// it dynamically and only in the client
const HomeEditor = dynamic(() => import('../HomeEditor'), {
  ssr: false,
}) as React.FC<any>;

export const LiveSection = ({ platform, ...rest }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {
    threshold: 0.125,
    freezeOnceVisible: true,
  });
  const isVisible = !!entry?.isIntersecting;
  if (isVisible) {
    trackScroll('Home#Live');
  }

  return (
    <View
      as="section"
      id="live"
      className={classNames(
        'docs-home-section',
        'fade-in',
        isVisible && 'shown'
      )}
      ref={ref}
    >
      <View className="docs-home-subsection">
        <Heading
          level={2}
          className={classNames('expand-out', isVisible && 'shown')}
        >
          Take it for a test drive
        </Heading>
      </View>

      <View className="docs-home-subsection">
        <HomeEditor />
      </View>
    </View>
  );
};
