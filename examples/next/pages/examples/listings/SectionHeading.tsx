import { Heading, Text, View } from '@aws-amplify/ui-react';
import { theme } from '../../../theme';
const { tokens } = theme;

export const SectionHeading = ({ title, subtitle }) => (
  <View padding={`0 0 ${tokens.space.large} 0`}>
    <Heading level={2}>{title}</Heading>
    <Text variation="tertiary" fontSize={tokens.fontSizes.large}>
      {subtitle}
    </Text>
  </View>
);
