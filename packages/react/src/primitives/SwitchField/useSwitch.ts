import React, { ChangeEvent, useCallback, useState } from 'react';

export const useSwitch = (props) => {
  const { changeEvent } = props;
  const [isChecked, setIsChecked] = useState(false);
  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsChecked(event.target.checked);
    },
    [changeEvent]
  );
  return {
    isChecked,
    changeHandler,
  };
};
