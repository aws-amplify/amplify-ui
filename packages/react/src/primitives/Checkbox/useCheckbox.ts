import React, { ChangeEvent, useState } from 'react';

export const useCheckbox = (
  initialChecked: boolean,
  onChangeProp: React.ChangeEventHandler
) => {
  const [dataChecked, setDataChecked] = useState(initialChecked);
  const [dataFocus, setDataFocus] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataChecked(e.target.checked);

    // this is the onChange function user passing in
    if (onChangeProp) {
      onChangeProp(e);
    }
  };

  const onFocus = () => {
    setDataFocus(true);
  };

  const onBlur = () => {
    setDataFocus(false);
  };

  return { dataChecked, dataFocus, onBlur, onChange, onFocus };
};
