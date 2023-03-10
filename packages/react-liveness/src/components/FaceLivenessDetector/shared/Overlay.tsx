import * as React from 'react';
import { Flex, FlexProps } from '@aws-amplify/ui-react';

interface AnchorOrigin {
  horizontal: 'start' | 'center' | 'end';
  vertical: 'start' | 'center' | 'end' | 'space-between';
}

interface OverlayProps extends FlexProps {
  anchorOrigin?: AnchorOrigin;
}

export const Overlay: React.FC<OverlayProps> = ({
  children,
  anchorOrigin = { horizontal: 'center', vertical: 'center' },
  ...rest
}) => {
  return (
    <Flex
      direction="column"
      position="absolute"
      left="0"
      top="0"
      alignItems={anchorOrigin.horizontal}
      justifyContent={anchorOrigin.vertical}
      width="100%"
      height="100%"
      padding="xl"
      {...rest}
    >
      {children}
    </Flex>
  );
};
