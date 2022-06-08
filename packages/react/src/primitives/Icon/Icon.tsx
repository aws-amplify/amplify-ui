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
    paths,
    ...rest
  },
  ref
) => {
  const minX = viewBox.minX ? viewBox.minX : defaultViewBox.minX;
  const minY = viewBox.minY ? viewBox.minY : defaultViewBox.minY;
  const width = viewBox.width ? viewBox.width : defaultViewBox.width;
  const height = viewBox.height ? viewBox.height : defaultViewBox.height;

  // An icon can be drawn in 3 ways:
  // 1. Pass it children which should be valid SVG elements
  // 2. Pass an array of path-like objects to `paths` prop
  // 3. Supply `pathData` for a simple icons
  let _children: React.ReactNode;
  if (children) {
    _children = children;
  }
  if (paths) {
    _children = paths.map((path, index) => <path {...path} key={index} />);
  }
  if (pathData) {
    _children = <path d={pathData} fill={fill} />;
  }

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

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/icon)
 */
export const Icon = React.forwardRef(IconPrimitive);

Icon.displayName = 'Icon';
