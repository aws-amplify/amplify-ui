import { ViewProps } from './view';

export interface HighlightMatchProps extends ViewProps {
  /**
   * @description
   * The label you would like to have match highlighting
   */
  children: string;

  /**
   * @description
   * A query string used to match against the label
   */
  query: string;
}
