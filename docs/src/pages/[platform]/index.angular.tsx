import * as React from 'react';

import {
  Authenticator,
  Button,
  Card,
  Flex,
  Heading,
  Link,
  Text,
  View,
  useTheme,
} from '@aws-amplify/ui-react';

import { useCustomRouter } from '@/components/useCustomRouter';
import { A11ySection } from './A11ySection';
import { AuthenticationSection } from './AuthenticationSection';
import { ThemingSection } from './ThemingSection';

const VueHomePage = ({ colorMode }) => {
  const {
    query: { platform = 'react' },
  } = useCustomRouter();

  return (
    <>
      <AuthenticationSection platform={platform} />
      <ThemingSection colorMode={colorMode} />
      <A11ySection />
    </>
  );
};

export default VueHomePage;
