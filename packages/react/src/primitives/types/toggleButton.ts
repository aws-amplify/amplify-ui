import { BaseButtonProps } from './button';
import { ElementType, PrimitiveProps } from './view';

export interface BaseToggleButtonProps extends BaseButtonProps {
  /**
   * @description
   * Controls the selected state of the ToggleButton
   */
  value?: string;

  /**
   * @description
   * Controls the `isPressed` state of the ToggleButton when using it as a controlled component
   */
  isPressed?: boolean;

  /**
   * @description
   * When `true`, sets the `isPressed` state of the ToggleButton to `true` on initial render
   */
  defaultPressed?: boolean;

  /**
   * @description
   * Handles changes to the current value when using the ToggleButton as a controlled component
   */
  onChange?: (value: string | undefined) => void;
}

export type ToggleButtonProps<Element extends ElementType = 'button'> =
  PrimitiveProps<BaseToggleButtonProps, Element>;
