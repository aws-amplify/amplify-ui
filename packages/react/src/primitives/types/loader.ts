import { Property } from 'csstype';

import { ViewProps } from '../types/view';
import { Sizes } from './base';

export type LoaderSizes = Sizes;

export type LoaderVariations = 'linear';

export interface LoaderProps extends ViewProps {
  size?: LoaderSizes;
  variation?: LoaderVariations;
  filledColor?: Property.Color;
  emptyColor?: Property.Color;
}
