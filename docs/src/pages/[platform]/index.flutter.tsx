import * as React from 'react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { AuthenticationSection } from './home/AuthenticationSection';
import { AmplifySection } from './home/AmplifySection';

const FlutterHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  return (
    <>
      <AuthenticationSection platform={platform} />
      <AmplifySection />
    </>
  );
};

export default FlutterHomePage;
