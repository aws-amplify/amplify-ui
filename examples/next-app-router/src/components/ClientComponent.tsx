'use client';
import { theme } from '@/theme';
import { Text } from '@aws-amplify/ui-react';

export const MyClientComponent = () => {
  return <Text color={theme.tokens.colors.font.success}>Client!</Text>;
};
