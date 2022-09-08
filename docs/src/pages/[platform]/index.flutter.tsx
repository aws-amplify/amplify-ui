import * as React from 'react';
import { useRouter } from 'next/router';

import {
  AmplifySection,
  AuthenticationSection,
} from '@/components/home/sections';

const FlutterHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  return (
    <>
      <AuthenticationSection platform={platform} />
      <AmplifySection platform={platform} />
    </>
  );
};

export default FlutterHomePage;
