import { ElementType, PrimitiveProps, BaseViewProps } from '../types/view';

export interface BaseAccordionProps extends BaseViewProps {
  /**
   * @description
   * The value of the item(s) to expand.  Use on uncontrolled component.
   */
  defaultValue?: string[];

  /**
   * @description
   * The controlled value of the item(s) to expand. Must be used in conjunction with onValueChange.
   */
  value?: string[];

  /**
   * @description
   * Determines whether the opened item can be collapsed if this is a single expander.
   */
  isCollapsible?: boolean;

  /**
   * @description
   * Determines whether one or multiple items can be opened at the same time.
   * Default: false
   */
  isExclusive?: boolean;

  /**
   * @description
   * Event handler called when the expanded state of an item changes
   */
  onChange?: (value?: string[]) => void;
}

export type AccordionProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseAccordionProps, Element>;

export interface BaseAccordionItemProps extends BaseViewProps {
  /**
   * @description
   * The content of the heading.
   */
  title?: React.ReactNode;

  /**
   * @description
   * A unique value for the item.
   */
  value?: string;
}

export type AccordionItemProps<Element extends ElementType = 'details'> =
  PrimitiveProps<BaseAccordionItemProps, Element>;
