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
import { HomeCTA } from '@/components/Home/HomeCTA';

export const ThemingSection = ({ colorMode, platform }) => {
  const { tokens } = useTheme();
  return (
    <View as="section" className="docs-home-section docs-gradient-bg">
      <Heading level={2} textAlign="center">
        <strong>Theming</strong> controls to match your brand
      </Heading>
      <ThemeSwitcher colorMode={colorMode} />
      <HomeCTA href={`${platform}/theming`}>Learn more about theming</HomeCTA>
    </View>
  );
};
