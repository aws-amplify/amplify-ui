import classNames from 'classnames';
import * as React from 'react';
import { ComponentClassNames } from '../shared';
import { DividerProps } from '../types';
import { View } from '../View';

export const Divider: React.FC<DividerProps> = (props) => {
  const {
    className,
    orientation = 'horizontal',
    size = 'small',
    ...rest
  } = props;
  return (
    <View
      aria-orientation={orientation}
      as="hr"
      className={classNames(ComponentClassNames.Divider, className)}
      data-size={size}
      {...rest}
    />
  );
};
