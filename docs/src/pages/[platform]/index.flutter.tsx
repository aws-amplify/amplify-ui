import * as React from 'react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { AuthenticationSection } from './home/AuthenticationSection';

const FlutterHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  return (
    <>
      <AuthenticationSection platform={platform} />
    </>
  );
};

export default FlutterHomePage;
