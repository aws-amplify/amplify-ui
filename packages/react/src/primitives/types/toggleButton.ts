import { ButtonProps } from './button';

export interface ToggleButtonProps extends ButtonProps {
  value?: string;
  isPressed?: boolean;
  defaultPressed?: boolean;
  onChange?: (value: string) => void;
}
