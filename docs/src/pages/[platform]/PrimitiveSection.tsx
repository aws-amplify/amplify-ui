import * as React from 'react';
import dynamic from 'next/dynamic';
import { MdOutlineWidgets } from 'react-icons/md';
import {
  Heading,
  useBreakpointValue,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { debounce } from 'lodash';
import { HomeCTA } from '@/components/Home/HomeCTA';

// react-live does not work with SSR so we have to load
// it dynamically and only in the client
const HomeEditor = dynamic(() => import('../HomeEditor'), { ssr: false });

export const PrimitiveSection = ({ platform }) => {
  const { tokens } = useTheme();
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const showEditor = useBreakpointValue({
    base: false,
    medium: true,
  });
  const max = 45;
  let interval = null;

  React.useEffect(() => {
    const callback = debounce((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        if (interval || count >= max) {
          return;
        }
        interval = setInterval(() => {
          if (count >= max) {
            return;
          }
          setCount((count) => count + 1);
        }, 25);
      } else {
        clearInterval(interval);
        interval = null;
      }
    });

    const observer = new IntersectionObserver(callback, {});
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      clearInterval(interval);
      interval = null;
    };
  }, [count, ref]);

  return (
    <View
      as="section"
      className="docs-home-section docs-grid-bg centered"
      ref={ref}
    >
      <View className="docs-home-container">
        <Heading level={2} textAlign="center">
          Speed up development with over <br />
          <strong>{count} production-ready components</strong>
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
