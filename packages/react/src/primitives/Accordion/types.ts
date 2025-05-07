import type React from 'react';
import type { ElementType, PrimitiveProps, BaseViewProps } from '../types/view';

export interface BaseAccordionProps extends BaseViewProps {
  /**
   * @description
   * The initial value of the item(s) to expand.  Use on uncontrolled component.
   */
  defaultValue?: string[];

  /**
   * @description
   * The controlled value of the item(s) to expand.
   */
  value?: string[];

  /**
   * @description
   * Allow multiple items to be expanded at the same time.
   * @default: false
   */
  allowMultiple?: boolean;

  /**
   * @description
   * Prevent collapse when a single item is expanded.
   * @default: false
   */
  preventCollapse?: boolean;

  /**
   * @description
   * Event handler called when the expanded state of an item changes
   */
  onValueChange?: (value?: string[]) => void;

  /**
   * @description
   * Array of accordion items for a non-composed accordion
   */
  items?: Array<{
    trigger?: React.ReactNode;
    content?: React.ReactNode;
    value?: string;
  }>;
}

export type AccordionProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseAccordionProps, Element>;

export interface BaseAccordionItemProps extends BaseViewProps {
  /**
   * @description
   * A unique value for the item.
   */
  value?: string;
}

export type AccordionItemProps<Element extends ElementType = 'details'> =
  PrimitiveProps<BaseAccordionItemProps, Element>;
