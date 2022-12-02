import { ChangeEvent, useCallback, useState } from 'react';

export const useSwitch = (props) => {
  const { onChange, isChecked, defaultChecked, isDisabled } = props;
  const isControlled = typeof isChecked !== 'undefined';
  const [isOn, setIsOn] = useState(isControlled ? isChecked : defaultChecked);
  const [isFocused, setIsFocused] = useState(false);

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      typeof onChange === 'function' && onChange(event);
      setIsOn(event.target.checked);
    },
    [onChange, isDisabled]
  );

  if (isControlled && isOn !== isChecked) {
    setIsOn(isChecked);
  }
  return {
    isOn,
    changeHandler,
    isFocused,
    setIsFocused,
  };
};
