import * as React from 'react';

import { isFunction } from '../shared/utils';
import { ToggleButtonProps } from '../types';

export const useToggleButton = ({
  isPressed,
  defaultPressed,
  onClick,
  onChange,
  value,
}: ToggleButtonProps) => {
  const isControlled = value !== undefined;
  // Maintain internal selected state for unconrolled component
  const [pressed, setPressed] = React.useState(defaultPressed);
  isPressed = isControlled ? isPressed : pressed;
  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isFunction(onClick)) {
        onClick(event);
      }

      if (!isControlled) {
        setPressed(!pressed);
      }

      if (isControlled && isFunction(onChange)) {
        onChange(value);
      }
    },
    [isControlled, onClick, onChange, pressed, value]
  );
  return { isPressed, handleClick };
};
