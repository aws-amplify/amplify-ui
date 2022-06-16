import * as React from 'react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { A11ySection } from './home/A11ySection';
import { AuthenticationSection } from './home/AuthenticationSection';
import { ThemingSection } from './home/ThemingSection';
import { ComingSoonPrimitiveSection } from './home/PrimitiveSection';
import { AmplifySection } from './home/AmplifySection';

const VueHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  return (
    <>
      <AuthenticationSection platform={platform} />
      <ThemingSection platform={platform} colorMode={colorMode} />
      <A11ySection platform={platform} />
      <ComingSoonPrimitiveSection platform={platform} />
      <AmplifySection />
    </>
  );
};

export default VueHomePage;
