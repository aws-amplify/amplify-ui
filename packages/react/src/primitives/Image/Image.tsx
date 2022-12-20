import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { ImageProps, Primitive } from '../types';
import { View } from '../View';

const ImagePrimitive: Primitive<ImageProps, 'img'> = (
  { as = 'img', className, ...rest },
  ref
) => (
  <View
    as={as}
    ref={ref}
    className={classNames(
      // When render as a third party Image, remove amplify class
      // otherwise it will affect the styling
      { [ComponentClassNames.Image]: as === 'img' },
      className
    )}
    {...rest}
  />
);

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/image)
 */
export const Image = React.forwardRef(ImagePrimitive);

Image.displayName = 'Image';
