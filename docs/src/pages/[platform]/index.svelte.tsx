import * as React from 'react';
import { useRouter } from 'next/router';

import {
  A11ySection,
  AmplifySection,
  AuthenticationSection,
  ComingSoonPrimitiveSection,
  CompatibleSection,
} from '@/components/home/sections';

const SvelteHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'svelte' },
  } = useRouter();

  return (
    <>
      <AuthenticationSection platform={platform} />
      <A11ySection platform={platform} />
      <CompatibleSection platform={platform} />
      <AmplifySection platform={platform} />
      <ComingSoonPrimitiveSection platform={platform} />
    </>
  );
};

export default SvelteHomePage;
