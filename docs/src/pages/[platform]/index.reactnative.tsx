import * as React from 'react';
import { useBreakpointValue } from '@aws-amplify/ui-react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { AmplifySection, CompatibleSection } from '@/components/home/sections';

export default function ReactNativeHomePage({ colorMode }) {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  return (
    <>
      <AmplifySection platform={platform} />
      <CompatibleSection platform={platform} />
    </>
  );
}
