import { ViewProps } from './view';
import { ButtonProps } from './button';

export interface FieldGroupIconProps extends ViewProps {
  /**
   * @deprecated
   * isVisible will be removed in the next major release in favor of isHidden. Please use isHidden instead.
   */
  isVisible?: boolean;

  /**
   * @default false
   * Determines whether Icon should be hidden.
   */
  isHidden?: boolean;

  /**
   * Determines whether element should be focusable.
   * When set to false, tabindex="-1" will be set
   */
  excludeFromTabOrder?: boolean;
}

export interface FieldGroupIconButtonProps
  extends FieldGroupIconProps,
    Pick<ButtonProps, 'onClick' | 'variation' | 'size' | 'type'> {}
