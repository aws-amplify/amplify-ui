import * as React from 'react';
import { ComponentClassNames } from '../shared';
import { ImageProps } from '../types';
import { View } from '../View';

export const Image: React.FC<ImageProps> = (props) => (
  <View as="img" className={ComponentClassNames.Image} {...props} />
);
