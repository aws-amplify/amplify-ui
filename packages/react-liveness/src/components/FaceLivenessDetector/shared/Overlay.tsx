import * as React from 'react';
import { Flex, FlexProps } from '@aws-amplify/ui-react';
import { LivenessClassNames } from '../types/classNames';

interface OverlayProps extends FlexProps {
  horizontal?: 'start' | 'center' | 'end';
  vertical?: 'start' | 'center' | 'end' | 'space-between';
}

export const Overlay: React.FC<OverlayProps> = ({
  children,
  horizontal = 'center',
  vertical = 'center',
  className,
  ...rest
}) => {
  return (
    <Flex
      className={`${LivenessClassNames.Overlay} ${className}`}
      alignItems={horizontal}
      justifyContent={vertical}
      {...rest}
    >
      {children}
    </Flex>
  );
};
