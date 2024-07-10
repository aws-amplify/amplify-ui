import React from 'react';

import { ViewElement as View, ViewElementProps } from '../types';

const BLOCK_NAME = 'messages';
const _className = `${BLOCK_NAME}__container`;

const MessagesContainer = React.forwardRef<
  ViewElementProps['ref'],
  ViewElementProps
>(({ children, className = _className, ...props }, ref) => {
  return (
    <View {...props} className={className} ref={ref}>
      {children ?? 'Avatar'}
    </View>
  );
});

MessagesContainer.displayName = 'MessagesContainer';

export { MessagesContainer };
