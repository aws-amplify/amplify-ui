import { ButtonProps } from './button';

export interface ToggleButtonProps extends ButtonProps {
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
  onChange?: (value: string) => void;
}
