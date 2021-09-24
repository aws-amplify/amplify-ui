import { MouseEvent } from 'react';

import { ButtonProps } from './button';

export interface ToggleButtonProps extends ButtonProps {
  value?: string;
  isSelected?: boolean;
  defaultSelected?: boolean;
  onChange?: (event: MouseEvent<HTMLButtonElement>, value: string) => void;
}
