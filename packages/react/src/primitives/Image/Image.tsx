import classNames from 'classnames';

import { ComponentClassNames } from '../shared';
import { ImageProps, Primitive } from '../types';
import { View } from '../View';

export const Image: Primitive<ImageProps, 'img'> = ({ className, ...rest }) => (
  <View
    as="img"
    className={classNames(ComponentClassNames.Image, className)}
    {...rest}
  />
);
