import React from 'react';
import { ViewElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../context/elements';
import { ActionsBarButton } from './ActionsBarButton';
import { ActionsBarIcon } from './ActionsBarIcon';

export const ActionsBarElement = <T extends ViewElementProps>({
  children,
  className,
  ...rest
}: T): JSX.Element => {
  const View = useElement('View');

  return (
    <View className={className} {...rest}>
      {children}
    </View>
  );
};

const ActionsBar = Object.assign(ActionsBarElement, {
  ActionsBarButton,
  ActionsBarIcon,
});

export { ActionsBar };
