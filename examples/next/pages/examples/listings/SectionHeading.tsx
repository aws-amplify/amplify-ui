import { Heading, Text, defaultTheme, View } from '@aws-amplify/ui-react';

export const SectionHeading = ({ title, subtitle }) => (
  <View padding={`0 0 ${defaultTheme.tokens.space.large} 0`}>
    <Heading level={2}>{title}</Heading>
    <Text
      variation="tertiary"
      fontSize={`${defaultTheme.tokens.fontSizes.large}`}
    >
      {subtitle}
    </Text>
  </View>
);
