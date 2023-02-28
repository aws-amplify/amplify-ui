import * as React from 'react';
import { useRouter } from 'next/router';

import {
  AmplifySection,
  AuthenticationSection,
} from '@/components/home/sections';

const AndroidHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'android' },
  } = useRouter();

  return (
    <>
      <AmplifySection platform={platform} />
    </>
  );
};

export default AndroidHomePage;
