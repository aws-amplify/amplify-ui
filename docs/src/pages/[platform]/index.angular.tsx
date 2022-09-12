import * as React from 'react';
import { useRouter } from 'next/router';

import {
  A11ySection,
  AmplifySection,
  AuthenticationSection,
  ComingSoonPrimitiveSection,
  CompatibleSection,
  ThemingSection,
} from '@/components/home/sections';

const VueHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  return (
    <>
      <AuthenticationSection platform={platform} />
      <ThemingSection platform={platform} colorMode={colorMode} />
      <A11ySection platform={platform} />
      <CompatibleSection platform={platform} />
      <AmplifySection platform={platform} />
      <ComingSoonPrimitiveSection platform={platform} />
    </>
  );
};

export default VueHomePage;
