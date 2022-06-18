import * as React from 'react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { A11ySection } from './home/A11ySection';
import { FigmaSection } from './home/FigmaSection';
import { AuthenticationSection } from './home/AuthenticationSection';
import { ThemingSection } from './home/ThemingSection';
import { CompatibleSection } from './home/CompatibleSection';
import { PrimitiveSection } from './home/PrimitiveSection';
import { LiveSection } from './home/LiveSection';
import { AmplifySection } from './home/AmplifySection';
import { useBreakpointValue } from '@aws-amplify/ui-react';

const ReactHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  const showEditor = useBreakpointValue({
    base: false,
    medium: true,
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
