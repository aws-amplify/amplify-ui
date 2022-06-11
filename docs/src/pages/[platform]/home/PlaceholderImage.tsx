import { Flex, useTheme } from '@aws-amplify/ui-react';
import { AmplifyIcon } from '../../../components/AmplifyIcon';

export const PlaceholderImage = (props) => {
  const { tokens } = useTheme();

  return (
    <Flex
      {...props}
      alignItems="center"
      justifyContent="center"
      padding={tokens.space.xl}
      backgroundColor={tokens.colors.background.tertiary}
      fontSize={tokens.fontSizes.xxl}
    >
      <AmplifyIcon />
    </Flex>
  );
};
