import { ViewProps } from './view';

export type CardVariations = 'outlined' | 'elevated';

export interface CardProps extends ViewProps {
  variation?: CardVariations;
}
