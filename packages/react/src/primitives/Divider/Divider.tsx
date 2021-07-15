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
      as="hr"
      className={classNames(ComponentClassNames.Divider, className)}
      data-size={size}
      aria-orientation={orientation}
      {...rest}
    />
  );
};
