import { ElementType, PrimitiveProps, BaseViewProps } from './view';

export interface BaseHighlightMatchProps extends BaseViewProps {
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

export type HighlightMatchProps<Element extends ElementType = 'span'> =
  PrimitiveProps<BaseHighlightMatchProps, Element>;
