import { Heading, Text, useTheme } from '@aws-amplify/ui-react';

export const FontSizesExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <Heading level={2} fontSize={tokens.fontSizes.medium}>
        This is an H2 with a smaller than usual font size.*
      </Heading>
      <Text fontSize={tokens.fontSizes.small}>*Note: Some smaller text.</Text>
    </>
  );
};
