import * as React from 'react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { A11ySection } from './A11ySection';
import { FigmaSection } from './FigmaSection';
import { AuthenticationSection } from './AuthenticationSection';
import { ThemingSection } from './ThemingSection';
import { CompatibleSection } from './CompatibleSection';
import { PrimitiveSection } from './PrimitiveSection';

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
