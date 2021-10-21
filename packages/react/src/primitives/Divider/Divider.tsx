import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { DividerProps, Primitive } from '../types';
import { View } from '../View';

export const Divider: Primitive<DividerProps, 'hr'> = ({
  className,
  orientation = 'horizontal',
  size,
  ...rest
}) => (
  <View
    aria-orientation={orientation}
    as="hr"
    className={classNames(ComponentClassNames.Divider, className)}
    data-size={size}
    {...rest}
  />
);
