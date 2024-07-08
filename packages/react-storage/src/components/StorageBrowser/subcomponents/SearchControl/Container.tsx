import * as React from 'react';
import { ViewElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Container = <T extends ViewElementProps>({
  children,
  className: _className,
  ...rest
}: T): JSX.Element => {
  const View = useElement('View');
  const baseClassName = 'amplify-storagebrowser__search';
  const className = _className ?? baseClassName;
  return (
    <View className={className} {...rest}>
      {children}
    </View>
  );
};
