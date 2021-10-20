import { Property } from 'csstype';

import { ViewProps } from '../types/view';
import { Sizes } from './base';

type LoaderSizes = Sizes;

type LoaderVariations = 'circular' | 'linear';

export interface LoaderProps extends ViewProps {
  size?: LoaderSizes;
  variation?: LoaderVariations;
  color?: Property.Color;
  emptyColor?: Property.Color;
}
