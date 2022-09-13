import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

import { isFunction } from '../shared/utils';

interface UseCheckbox {
  dataChecked: boolean;
  dataFocus: boolean;
  onBlur: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  setDataChecked: Dispatch<SetStateAction<boolean>>;
}

export const useCheckbox = (
  initialChecked: boolean,
  onChangeProp: React.ChangeEventHandler
): UseCheckbox => {
  const [dataChecked, setDataChecked] = useState(initialChecked);
  const [dataFocus, setDataFocus] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDataChecked(e.target.checked);

    // this is the onChange function user passing in
    if (isFunction(onChangeProp)) {
      onChangeProp(e);
    }
  };

  const onFocus = () => {
    setDataFocus(true);
  };

  const onBlur = () => {
    setDataFocus(false);
  };

  return { dataChecked, dataFocus, onBlur, onChange, onFocus, setDataChecked };
};
