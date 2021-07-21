import React from 'react';
import classNames from 'classnames';

import { IconProps } from '../types';
import { ComponentClassNames } from '../shared';
import { View } from '../View';

const defaultViewBox = { minX: 0, minY: 0, width: 24, height: 24 };
export const Icon: React.FC<IconProps> = (props) => {
  const {
    className,
    fill = 'currentColor',
    pathData,
    size = 'medium',
    viewBox = defaultViewBox,
    ...rest
  } = props;

  const minX = viewBox.minX ? viewBox.minX : defaultViewBox.minX;
  const minY = viewBox.minY ? viewBox.minY : defaultViewBox.minY;
  const width = viewBox.width ? viewBox.width : defaultViewBox.width;
  const height = viewBox.height ? viewBox.height : defaultViewBox.height;
  return (
    <View
      as="svg"
      className={classNames(ComponentClassNames.Icon, className)}
      data-size={size}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      {...rest}
    >
      <path d={pathData} fill={fill}></path>
    </View>
  );
};
