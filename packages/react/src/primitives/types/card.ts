import { ViewProps } from './view';

export type CardVariations = 'outlined' | 'elevated';

export interface CardProps extends ViewProps {
  /**
   * Changes the displayed style of the Card. Options include ‘outlined’, ‘elevated’ and none (default)
   */
  variation?: CardVariations;
}
