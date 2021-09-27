import { useCallback, useState, MouseEvent } from 'react';

import { ToggleButtonProps } from '../types';

export const useToggleButton = ({
  isSelected,
  defaultSelected,
  onClick,
  onChange,
  value,
}: ToggleButtonProps) => {
  const isControlled = isSelected !== undefined;
  // Maintain internal selected state for unconrolled component
  const [selected, setSelected] = useState(defaultSelected);
  const isPressed = isControlled ? isSelected : selected;
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e);
      }

      if (!isControlled) {
        setSelected(!selected);
      } else if (onChange) {
        onChange(e, value);
      }
    },
    [isControlled, onClick, onChange, selected, value]
  );
  return { isPressed, handleClick };
};
