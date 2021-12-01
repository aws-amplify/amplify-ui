import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { ImageProps, Primitive } from '../types';
import { View } from '../View';

const ImagePrimitive: Primitive<ImageProps, 'img'> = (
  { className, ...rest },
  ref
) => (
  <View
    as="img"
    ref={ref}
    className={classNames(ComponentClassNames.Image, className)}
    {...rest}
  />
);

export const Image = React.forwardRef(ImagePrimitive);

Image.displayName = 'Image';
