import { ViewProps } from '../types/view';

type ExpanderType = 'single' | 'multiple';

export interface ExpanderProps extends ViewProps {
  /**
   * The value of the item(s) to expand.  Use on uncontrolled component.
   */
  defaultValue?: string | string[];

  /**
   * The controlled value of the item(s) to expand. Must be used in conjunction with onChange.
   */
  value?: string | string[];

  /**
   * Determines whether the opened item can be collapsed if this is a single expander.
   */
  isCollapsible?: boolean;

  /**
   * Determines whether one or multiple items can be opened at the same time.
   */
  type?: ExpanderType;

  /**
   * Event handler called when the expanded state of an item changes
   */
  onChange?: (value?: string | string[]) => void;
}

export interface ExpanderItemProps extends ViewProps {
  /**
   * The content of the heading.
   */
  title?: React.ReactNode;

  /**
   * A unique value for the item.
   */
  value: string;
}
