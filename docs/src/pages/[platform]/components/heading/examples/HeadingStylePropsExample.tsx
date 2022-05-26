import * as React from 'react';
import { Heading, useTheme } from '@aws-amplify/ui-react';

export const HeadingStylePropsExample = () => {
  const { tokens } = useTheme();
  return (
    <Heading
      level={3}
      color={tokens.colors.green[80]}
      fontWeight={tokens.fontWeights.bold}
    >
      Hello world
    </Heading>
  );
};
