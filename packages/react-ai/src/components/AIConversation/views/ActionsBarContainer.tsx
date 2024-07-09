import React from 'react';
import { ViewElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';

const BLOCK_NAME = 'actions-bar';
const _className = `${BLOCK_NAME}__container`;

export const ActionsBarContainer = React.forwardRef<
  ViewElementProps['ref'],
  ViewElementProps
>(({ children, className = _className, ...props }, ref) => {
  const View = useElement('View');

  return (
    <View className={className} {...props} ref={ref}>
      {children}
    </View>
  );
});

ActionsBarContainer.displayName = 'ActionsBarContainer';
