import React from 'react';
import { ViewElement as View, ViewElementProps } from '../types';

const BLOCK_NAME = 'avatar';
const _className = `${BLOCK_NAME}__container`;

const AvatarContainer = React.forwardRef<
  ViewElementProps['ref'],
  ViewElementProps
>(({ children, className = _className, ...props }, ref) => {
  return (
    <View {...props} className={className} ref={ref}>
      {children ?? 'Avatar'}
    </View>
  );
});

AvatarContainer.displayName = 'AvatarContainer';

export { AvatarContainer };
