import * as React from 'react';
import dynamic from 'next/dynamic';
import {
  Authenticator,
  Button,
  Card,
  Flex,
  Heading,
  IconChevronRight,
  Text,
  View,
  useTheme,
  useBreakpointValue,
} from '@aws-amplify/ui-react';

// react-live does not work with SSR so we have to load
// it dynamically and only in the client
const HomeEditor = dynamic(() => import('../HomeEditor'), { ssr: false });

import { HomePrimitivePreview } from '../HomePrimitivePreview';
import { useCustomRouter } from '@/components/useCustomRouter';
import { A11ySection } from './A11ySection';
import { ThemeSwitcher } from '@/components/Home/ThemeSwitcher';
import { FigmaSection } from './FigmaSection';
import { AuthenticationSection } from './AuthenticationSection';
import { ThemingSection } from './ThemingSection';

const ReactHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();
  const { tokens } = useTheme();
  const showEditor = useBreakpointValue({
    base: false,
    medium: true,
  });

  return (
    <>
      <FigmaSection />

      {showEditor ? (
        <View className="docs-grid-bg" padding={tokens.space.xxl}>
          <Heading level={2} textAlign="center" margin={tokens.space.large}>
            Take it for a test drive
          </Heading>
          <View className="container">
            <HomeEditor />
          </View>
        </View>
      ) : null}

      <AuthenticationSection platform={platform} />

      <ThemingSection colorMode={colorMode} />

      <A11ySection />
    </>
  );
};

export default ReactHomePage;
