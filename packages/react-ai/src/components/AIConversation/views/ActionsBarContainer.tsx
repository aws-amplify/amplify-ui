import React from 'react';
import { ViewElement as View, ViewElementProps } from '../types';

const BLOCK_NAME = 'actions-bar';
const _className = `${BLOCK_NAME}__container`;

export const ActionsBarContainer = React.forwardRef<
  ViewElementProps['ref'],
  ViewElementProps
>(({ children, className = _className, ...props }, ref) => {
  return (
    <View className={className} {...props} ref={ref}>
      {children}
    </View>
  );
});

ActionsBarContainer.displayName = 'ActionsBarContainer';
