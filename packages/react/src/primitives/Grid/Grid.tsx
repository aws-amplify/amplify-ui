import classNames from 'classnames';

import { ComponentClassNames } from '../shared/constants';
import { GridProps, Primitive } from '../types';
import { View } from '../View';

export const Grid: Primitive<GridProps, 'div'> = ({
  className,
  children,
  ...rest
}) => (
  <View className={classNames(ComponentClassNames.Grid, className)} {...rest}>
    {children}
  </View>
);

Grid.displayName = 'Grid';
