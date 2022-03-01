import { ViewProps } from './view';

export type CardVariations = 'outlined' | 'elevated' | 'default';

export interface CardProps extends ViewProps {
  variation?: CardVariations;
}
