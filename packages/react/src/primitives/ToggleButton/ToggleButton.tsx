import classNames from 'classnames';

import { useToggleButton } from './useToggleButton';
import { Button } from '../Button';
import { ToggleButtonProps, Primitive } from '../types';
import { ComponentClassNames } from '../shared/constants';

export const ToggleButton: Primitive<ToggleButtonProps, typeof Button> = ({
  className,
  children,
  defaultPressed = false,
  isDisabled,
  isPressed: isPressedProp,
  onChange,
  onClick,
  size,
  value,
  variation,
  ...rest
}) => {
  const { isPressed, handleClick } = useToggleButton({
    isPressed: isPressedProp,
    defaultPressed,
    onChange,
    onClick,
    value,
  });
  return (
    <Button
      aria-pressed={isPressed}
      className={classNames(ComponentClassNames.ToggleButton, className)}
      isDisabled={isDisabled}
      onClick={handleClick}
      size={size}
      type="button"
      variation={variation}
      {...rest}
    >
      {children}
    </Button>
  );
};
