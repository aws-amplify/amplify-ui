import classNames from 'classnames';

import { View } from '../View';
import { Primitive, ScrollViewProps } from '../types';
import { ComponentClassNames } from '../shared/constants';

export const ScrollView: Primitive<ScrollViewProps, 'div'> = ({
  children,
  className,
  orientation,
  ...rest
}) => (
  <View
    className={classNames(ComponentClassNames.ScrollView, className)}
    data-orientation={orientation}
    {...rest}
  >
    {children}
  </View>
);
