import * as React from 'react';
import { useRouter } from 'next/router';

import {
  AmplifySection,
  AuthenticationSection,
} from '@/components/home/sections';

const SwiftHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'swift' },
  } = useRouter();

  return (
    <>
      <AmplifySection platform={platform} />
    </>
  );
};

export default SwiftHomePage;
