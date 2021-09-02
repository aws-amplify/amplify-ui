import { Heading, Text, theme, View } from '@aws-amplify/ui-react';

export const SectionHeading = ({ title, subtitle }) => (
  <View padding={`0 0 ${theme.space.large} 0`}>
    <Heading level={2}>{title}</Heading>
    <Text variation="tertiary" fontSize={theme.fontSizes.large}>
      {subtitle}
    </Text>
  </View>
);
