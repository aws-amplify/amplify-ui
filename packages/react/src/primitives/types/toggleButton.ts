import { ButtonProps } from './button';

export interface ToggleButtonProps extends ButtonProps {
  /**
   * Controls the selected state of the ToggleButton
   */
  value?: string;

  /**
   * Controls the `isPressed` state of the ToggleButton when using it as a controlled component
   */
  isPressed?: boolean;

  /**
   * When `true`, sets the `isPressed` state of the ToggleButton to `true` on initial render
   */
  defaultPressed?: boolean;

  /**
   * Handles changes to the current value when using the ToggleButton as a controlled component
   */
  onChange?: (value: string) => void;
}
