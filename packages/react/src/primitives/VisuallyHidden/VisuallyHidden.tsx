import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { Primitive, VisuallyHiddenProps } from '../types';
import { View } from '../View';

export const VisuallyHidden: Primitive<VisuallyHiddenProps, 'span'> = ({
  as = 'span',
  children,
  className,
  ...rest
}) => (
  <View
    as={as}
    className={classNames(ComponentClassNames.VisuallyHidden, className)}
    {...rest}
  >
    {children}
  </View>
);
