import { Flex, Button, useTheme } from '@aws-amplify/ui-react';

export const DefaultFlexExample = () => {
  const { tokens } = useTheme();

  return (
    <Flex>
      <Button backgroundColor={tokens.colors.pink[10]}>Button 1</Button>
      <Button backgroundColor={tokens.colors.pink[20]}>Button 2</Button>
      <Button backgroundColor={tokens.colors.pink[40]}>Button 3</Button>
    </Flex>
  );
};
