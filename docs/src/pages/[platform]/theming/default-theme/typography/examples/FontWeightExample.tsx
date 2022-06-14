import { Heading, Text, useTheme } from '@aws-amplify/ui-react';

export const FontWeightExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <Heading level={2} fontWeight={tokens.fontWeights.thin}>
        Heading Text
      </Heading>
      <Text fontWeight={tokens.fontWeights.bold}>
        Some text example with a different font weight.
      </Text>
    </>
  );
};
