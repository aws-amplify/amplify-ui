import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { TextField } from '../TextField';
import { FieldClearButton } from '../Field';
import { SearchFieldButton } from './SearchFieldButton';
import { strHasLength } from '../shared/utils';
import { SearchFieldProps, InputProps, ButtonProps } from '../types';

const ESCAPE_KEY = 'Escape';
const ENTER_KEY = 'Enter';
const DEFAULT_KEYS = [ESCAPE_KEY, ENTER_KEY];

export const useSearchField = (onSubmit: SearchFieldProps['onSubmit']) => {
  const [value, setValue] = React.useState<string>('');

  const clearValue = React.useCallback(() => setValue(''), [setValue]);

  const onSubmitHandler = React.useCallback(
    (value: string) => {
      if (onSubmit) {
        onSubmit(value);
      }
    },
    [onSubmit]
  );

  const onKeyDown: InputProps['onKeyDown'] = React.useCallback(
    (event) => {
      const key = event.key;

      if (DEFAULT_KEYS.includes(key)) {
        event.preventDefault();
      }
      if (key === ESCAPE_KEY) {
        clearValue();
      }
      if (key === ENTER_KEY) {
        onSubmitHandler(value);
      }
    },
    [value, clearValue, onSubmitHandler]
  );

  const onInput: InputProps['onInput'] = React.useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const onClick: ButtonProps['onClick'] = React.useCallback(() => {
    onSubmitHandler(value);
  }, [onSubmitHandler, value]);

  return {
    value,
    clearValue,
    onKeyDown,
    onInput,
    onClick,
  };
};

export const SearchField: React.FC<SearchFieldProps> = ({
  autoComplete = 'off',
  className,
  labelHidden = true,
  label,
  name = 'q',
  onSubmit,
  size,
  ...rest
}) => {
  const { value, clearValue, onInput, onKeyDown, onClick } =
    useSearchField(onSubmit);

  return (
    <TextField
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.SearchField, className)}
      labelHidden={labelHidden}
      innerEndComponent={
        <FieldClearButton
          isVisible={strHasLength(value)}
          onClick={clearValue}
          excludeFromTabOrder={true}
          variation="link"
          size={size}
        />
      }
      label={label}
      name={name}
      onInput={onInput}
      onKeyDown={onKeyDown}
      outerEndComponent={<SearchFieldButton onClick={onClick} size={size} />}
      size={size}
      value={value}
      {...rest}
    />
  );
};
