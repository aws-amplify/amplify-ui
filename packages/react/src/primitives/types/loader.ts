import { Property } from 'csstype';

import { ViewProps } from '../types/view';
import { Sizes } from './base';

export type LoaderSizes = Sizes;

export type LoaderVariations = 'circular' | 'linear';

export interface LoaderProps extends ViewProps {
  size?: LoaderSizes;
  variation?: LoaderVariations;
  filledcolor?: Property.Color;
  emptyColor?: Property.Color;
}
