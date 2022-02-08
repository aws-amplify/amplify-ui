import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { IconProps, Primitive } from '../types';
import { View } from '../View';

const defaultViewBox = { minX: 0, minY: 0, width: 24, height: 24 };

const IconPrimitive: Primitive<IconProps, 'svg'> = (
  {
    className,
    // as can be used to render other icon react components too
    as = 'svg',
    fill = 'currentColor',
    pathData,
    viewBox = defaultViewBox,
    children,
    ...rest
  },
  ref
) => {
  const minX = viewBox.minX ? viewBox.minX : defaultViewBox.minX;
  const minY = viewBox.minY ? viewBox.minY : defaultViewBox.minY;
  const width = viewBox.width ? viewBox.width : defaultViewBox.width;
  const height = viewBox.height ? viewBox.height : defaultViewBox.height;

  // If given children, pass those through. They are expected to be valid
  // SVG elements. Fall back on rendering a single path with pathData
  const _children = children ? children : <path d={pathData} fill={fill} />;

  return (
    <View
      as={as}
      className={classNames(ComponentClassNames.Icon, className)}
      ref={ref}
      viewBox={`${minX} ${minY} ${width} ${height}`}
      {...rest}
    >
      {_children}
    </View>
  );
};

export const Icon = React.forwardRef(IconPrimitive);

Icon.displayName = 'Icon';
