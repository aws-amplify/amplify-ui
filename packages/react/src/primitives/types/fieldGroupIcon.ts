import { ViewProps } from './view';
import { ButtonProps } from './button';

export interface FieldGroupIconProps extends ViewProps {
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
