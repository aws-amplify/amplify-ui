import * as React from 'react';

import { View } from '../View';
import { LoaderProps } from '../types/loader';

export const Loader: React.FC<LoaderProps> = () => (
  <View>
    <View as="svg" />
  </View>
);
