import { Heading, Text, View, useTheme } from '@aws-amplify/ui-react';

export const SectionHeading = ({ title, subtitle }) => {
  const { tokens } = useTheme();
  return (
    <View padding={`0 0 ${tokens.space.large} 0`}>
      <Heading level={2}>{title}</Heading>
      <Text variation="tertiary" fontSize={tokens.fontSizes.large}>
        {subtitle}
      </Text>
    </View>
  );
};
