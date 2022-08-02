import * as React from 'react';

import { useCustomRouter } from '@/components/useCustomRouter';
import {
  AmplifySection,
  AuthenticationSection,
} from '@/components/home/sections';

const FlutterHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  return (
    <>
      <AuthenticationSection platform={platform} />
      <AmplifySection platform={platform} />
    </>
  );
};

export default FlutterHomePage;
