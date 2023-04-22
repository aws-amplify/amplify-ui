import * as React from 'react';
import { useRouter } from 'next/router';

import { AmplifySection } from '@/components/home/sections';

const SwiftHomePage = () => {
  const {
    query: { platform = 'swift' },
  } = useRouter();

  return <AmplifySection platform={platform} />;
};

export default SwiftHomePage;
