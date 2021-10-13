import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { TextField } from '../TextField';
import { FieldClearButton } from '../Field';
import { SearchFieldButton } from './SearchFieldButton';
import { isFunction, strHasLength } from '../shared/utils';
import { SearchFieldProps, InputProps, ButtonProps } from '../types';

const ESCAPE_KEY = 'Escape';
const ENTER_KEY = 'Enter';
const DEFAULT_KEYS = [ESCAPE_KEY, ENTER_KEY];

export const useSearchField = ({
  onSubmit,
  onClear,
}: Partial<SearchFieldProps>) => {
  const [value, setValue] = React.useState<string>('');

  const onClearHandler = React.useCallback(() => {
    setValue('');

    if (isFunction(onClear)) {
      onClear();
    }
  }, [setValue, onClear]);

  const onSubmitHandler = React.useCallback(
    (value: string) => {
      if (isFunction(onSubmit)) {
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
        onClearHandler();
      } else if (key === ENTER_KEY) {
        onSubmitHandler(value);
      }
    },
    [value, onClearHandler, onSubmitHandler]
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
    onClearHandler,
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
  onClear,
  size,
  ...rest
}) => {
  const { value, onClearHandler, onInput, onKeyDown, onClick } = useSearchField(
    { onSubmit, onClear }
  );

  return (
    <TextField
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.SearchField, className)}
      labelHidden={labelHidden}
      innerEndComponent={
        <FieldClearButton
          isVisible={strHasLength(value)}
          onClick={onClearHandler}
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
