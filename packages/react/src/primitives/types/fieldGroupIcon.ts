import { ViewProps } from './view';
import { AriaProps } from './base';
import { ButtonProps } from './button';

export interface FieldGroupIconProps extends ViewProps {
  /**
   * Accessible label for icon
   */
  ariaLabel: AriaProps['ariaLabel'];

  /**
   * React component to use instead of an anchor tag
   * This is used for react routing libraries that have routing components
   */
  as?: React.ComponentType;

  /**
   * Determines whether Icon should be visible
   */
  isVisible?: boolean;

  /**
   * Determines whether element should be focusable.
   * When set to false, tabindex="-1" will be set
   */
  excludeFromTabOrder?: boolean;
}

export interface FieldGroupIconButtonProps
  extends FieldGroupIconProps,
    Pick<ButtonProps, 'onClick' | 'variation' | 'size' | 'type'> {}
