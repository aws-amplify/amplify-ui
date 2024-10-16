import React, { useCallback, useState } from 'react';

import { Field } from '../../components/Field';
import { ButtonElement, IconElement } from '../../context/elements';

import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__search`;

const TOGGLE_BLOCK = 'toggle';

interface SearchControlProps {
  handleSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchControl = ({
  placeholder,
  handleSearch,
}: SearchControlProps): React.JSX.Element => {
  const [inputValue, setInputValue] = useState('');

  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    [setInputValue]
  );

  const clickHandler = useCallback(() => {
    handleSearch(inputValue);
  }, [inputValue, handleSearch]);

  const keyUpHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch(inputValue);
      }
    },
    [handleSearch, inputValue]
  );

  return (
    <Field
      icon={<IconElement variant="search" />}
      className={BLOCK_NAME}
      variant="search"
      value={inputValue}
      onChange={handler}
      placeholder={placeholder}
      onKeyUp={keyUpHandler}
    >
      <ButtonElement
        className={`${BLOCK_NAME}__button`}
        type={'submit'}
        onClick={clickHandler}
      >
        Submit
      </ButtonElement>
    </Field>
  );
};
