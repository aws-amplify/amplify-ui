import * as React from 'react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { A11ySection } from './home/A11ySection';
import { FigmaSection } from './home/FigmaSection';
import { AuthenticationSection } from './home/AuthenticationSection';
import { ThemingSection } from './home/ThemingSection';
import { CompatibleSection } from './home/CompatibleSection';
import { PrimitiveSection } from './home/PrimitiveSection';

const ReactHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  return (
    <>
      <FigmaSection />
      <PrimitiveSection platform={platform} />
      <AuthenticationSection platform={platform} />
      <ThemingSection platform={platform} colorMode={colorMode} />
      <A11ySection platform={platform} />
      <CompatibleSection platform={platform} />
    </>
  );
};

export default ReactHomePage;
