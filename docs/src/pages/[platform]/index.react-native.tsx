import * as React from 'react';
import { useRouter } from 'next/router';
import { AmplifySection, CompatibleSection } from '@/components/home/sections';

export default function ReactNativeHomePage({ colorMode }) {
  const {
    query: { platform = 'react' },
  } = useRouter();

  return (
    <>
      <AmplifySection platform={platform} />
      <CompatibleSection platform={platform} />
    </>
  );
}
