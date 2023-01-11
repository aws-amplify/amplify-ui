import React, { ChangeEvent, useCallback, useState } from 'react';

type ChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

interface UseSwitchProps {
  onChange?: ChangeHandler;
  isChecked?: boolean;
  defaultChecked?: boolean;
  isDisabled?: boolean;
}
interface UseSwitch {
  isOn: boolean;
  changeHandler: ChangeHandler;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSwitch = (props: UseSwitchProps): UseSwitch => {
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

      if (typeof onChange === 'function') {
        onChange(event);
      }

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
