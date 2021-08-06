import * as react from 'react';
import { Heading, Text, View } from '@aws-amplify/ui-react';

import theme from '@aws-amplify/ui-theme-base';

export const SectionHeading = ({ title, subtitle }) => (
  <View padding={`0 0 ${theme.space.large} 0`}>
    <Heading level={2}>{title}</Heading>
    <Text variation="tertiary" fontSize={theme.fontSizes.large}>
      {subtitle}
    </Text>
  </View>
);
