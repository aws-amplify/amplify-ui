import Link from 'next/link';

import {
  Button,
  Flex,
  Heading,
  Text,
  useTheme,
  View,
} from '@aws-amplify/ui-react';
import { ThemeSwitcher } from '@/components/Home/ThemeSwitcher';

export const ThemingSection = ({ colorMode }) => {
  return (
    <View as="section" className="docs-home-section docs-gradient-bg">
      <Heading level={2}>Theming controls to match your brand</Heading>
      <ThemeSwitcher colorMode={colorMode} />
    </View>
  );
};
