import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import {
  BaseImageProps,
  ImageProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { View } from '../View';

const ImagePrimitive: Primitive<ImageProps, 'img'> = (
  { className, isLazy, ...rest },
  ref
) => (
  <View
    as="img"
    ref={ref}
    className={classNames(ComponentClassNames.Image, className)}
    loading={isLazy ? 'lazy' : 'eager'}
    {...rest}
  />
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/image)
 */
export const Image: ForwardRefPrimitive<BaseImageProps, 'img'> =
  React.forwardRef(ImagePrimitive);

Image.displayName = 'Image';
