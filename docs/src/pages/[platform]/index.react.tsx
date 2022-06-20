import * as React from 'react';
import { useBreakpointValue } from '@aws-amplify/ui-react';

import { useCustomRouter } from '@/components/useCustomRouter';
import {
  A11ySection,
  AmplifySection,
  AuthenticationSection,
  CompatibleSection,
  FigmaSection,
  LiveSection,
  PrimitiveSection,
  ThemingSection,
} from '@/components/home/sections';

const ReactHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  const showEditor = useBreakpointValue({
    base: false,
    large: true,
  });

  return (
    <>
      {showEditor ? <LiveSection platform={platform} /> : null}
      <PrimitiveSection platform={platform} />
      <AuthenticationSection platform={platform} />
      <ThemingSection platform={platform} colorMode={colorMode} />
      <FigmaSection />
      <AmplifySection platform={platform} />
      <A11ySection platform={platform} />
      <CompatibleSection platform={platform} />
    </>
  );
};

export default ReactHomePage;
