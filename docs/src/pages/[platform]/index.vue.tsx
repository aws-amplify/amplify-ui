import * as React from 'react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { A11ySection } from './home/A11ySection';
import { AuthenticationSection } from './home/AuthenticationSection';
import { ThemingSection } from './home/ThemingSection';
import { AmplifySection } from './home/AmplifySection';
import { ComingSoonPrimitiveSection } from './home/PrimitiveSection';
import { CompatibleSection } from './home/CompatibleSection';

const VueHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  return (
    <>
      <AuthenticationSection platform={platform} />
      <ThemingSection platform={platform} colorMode={colorMode} />
      <A11ySection platform={platform} />
      <CompatibleSection platform={platform} />
      <ComingSoonPrimitiveSection platform={platform} />
      <AmplifySection platform={platform} />
    </>
  );
};

export default VueHomePage;
