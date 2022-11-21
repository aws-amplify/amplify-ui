import * as React from 'react';
import { Flex, FlexProps } from '../../../primitives';

interface AnchorOrigin {
  horizontal: 'start' | 'center' | 'end';
  vertical: 'start' | 'center' | 'end';
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
      padding="medium"
      {...rest}
    >
      {children}
    </Flex>
  );
};
