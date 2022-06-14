import * as React from 'react';
import dynamic from 'next/dynamic';
import { MdOutlineWidgets } from 'react-icons/md';
import {
  Heading,
  useBreakpointValue,
  Text,
  View,
  Grid,
  Card,
  TextField,
} from '@aws-amplify/ui-react';
import { HomeCTA } from 'src/pages/[platform]/home/HomeCTA';
import { useIntersectionObserver } from '@/components/useIntersection';

// react-live does not work with SSR so we have to load
// it dynamically and only in the client
const HomeEditor = dynamic(() => import('./HomeEditor'), {
  ssr: false,
}) as React.FC<any>;

export const ComingSoonPrimitiveSection = ({ platform }) => {
  return (
    <View as="section" className="docs-home-section docs-grid-bg centered">
      <View className="docs-home-container">
        <Heading level={2} textAlign="center">
          {platform} primitive components coming soon!
        </Heading>
      </View>
    </View>
  );
};

export const PrimitiveSection = ({ platform, ...rest }) => {
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
        <Text className="docs-home-text">
          Amplify UI components are built with plain React and CSS to provide a
          solid foundation for building UIs and design systems. These components
          are themeable, composable, reusable. They work well with other UI
          components or styling frameworks. Interactive components can be
          controlled and uncontrolled.
        </Text>
      </View>

      <Grid templateColumns="1fr 1fr 1fr 1fr">
        <Card>
          <Text fontWeight="bold"></Text>
          <TextField label="Pizza" />
        </Card>
      </Grid>

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
