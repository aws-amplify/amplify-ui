import * as React from 'react';
import { Flex, FlexProps } from '@aws-amplify/ui-react';
import { LivenessClassNames } from '../types/classNames';

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
  className,
  ...rest
}) => {
  return (
    <Flex
      className={`${LivenessClassNames.Overlay} ${className}`}
      alignItems={anchorOrigin.horizontal}
      justifyContent={anchorOrigin.vertical}
      {...rest}
    >
      {children}
    </Flex>
  );
};
