import { ElementType, PrimitiveProps, BaseViewProps } from '../types/view';

type ExpanderType = 'single' | 'multiple';

export interface BaseExpanderProps extends BaseViewProps {
  /**
   * @description
   * The value of the item(s) to expand.  Use on uncontrolled component.
   */
  defaultValue?: string | string[];

  /**
   * @description
   * The controlled value of the item(s) to expand. Must be used in conjunction with onChange.
   */
  value?: string | string[];

  /**
   * @description
   * Determines whether the opened item can be collapsed if this is a single expander.
   */
  isCollapsible?: boolean;

  /**
   * @description
   * Determines whether one or multiple items can be opened at the same time.
   */
  type?: ExpanderType;

  /**
   * @deprecated replace usage with `onValueChange`
   */
  onChange?: (value?: string | string[]) => void;

  /**
   * @description
   * Event handler called when the expanded state of an item changes
   */
  onValueChange?: (value?: string | string[]) => void;
}
export type ExpanderProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseExpanderProps,
  Element
>;

export interface BaseExpanderItemProps extends BaseViewProps {
  /**
   * @description
   * The content of the heading.
   */
  title?: React.ReactNode;

  /**
   * @description
   * A unique value for the item.
   */
  value: string;
}

export type ExpanderItemProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseExpanderItemProps, Element>;
