import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { PlaceholderProps, Primitive } from '../types';
import { View } from '../View';

export const Placeholder: Primitive<PlaceholderProps, 'div'> = ({
  className,
  children,
  isLoaded,
  size,
  ...rest
}) => {
  if (isLoaded) {
    return <>{children}</>;
  }

  return (
    <View
      className={classNames(ComponentClassNames.Placeholder, className)}
      data-size={size}
      {...rest}
    />
  );
};

Placeholder.displayName = 'Placeholder';
