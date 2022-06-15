import { Heading, Text, useTheme } from '@aws-amplify/ui-react';

export const FontSizesExample = () => {
  const { tokens } = useTheme();
  return (
    <>
      <Heading level={2} fontSize={tokens.fontSizes.medium}>
        This is an H2 with a smaller than usual font size.<sup>*</sup>
      </Heading>
      <Text fontSize={tokens.fontSizes.small}>
        <sup>*</sup>Note: Some smaller text.
      </Text>
    </>
  );
};
