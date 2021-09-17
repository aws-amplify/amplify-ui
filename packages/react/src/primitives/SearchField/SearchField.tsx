import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { TextField } from '../TextField';
import { FieldClearButton } from '../Field';
import { SearchFieldButton } from './SearchFieldButton';
import { strHasLength } from '../shared/utils';
import { SearchFieldProps, InputProps } from '../types';

const ESCAPE_KEY = 'Escape';
const ENTER_KEY = 'Enter';
const DEFAULT_KEYS = [ESCAPE_KEY, ENTER_KEY];

export const SearchField: React.FC<SearchFieldProps> = ({
  autoComplete = 'off',
  children,
  className,
  hideLabel = true,
  label,
  name = 'q',
  onSubmit,
  size,
  ...rest
}) => {
  const [value, setValue] = React.useState<string>('');

  const clearValue = React.useCallback(() => setValue(''), [setValue]);

  const onKeyDown = React.useCallback((event) => {
    const key = event.key;

    if (DEFAULT_KEYS.includes(key)) {
      event.preventDefault();
    }
    if (key === ESCAPE_KEY) {
      clearValue();
    }
    if (key === ENTER_KEY) {
      onSubmitHandler(event);
    }
  }, []);

  const onInput: InputProps['onInput'] = React.useCallback(
    (event) => {
      const { value } = event.currentTarget;
      setValue(value);
    },
    [setValue]
  );

  const onSubmitHandler = React.useCallback((event) => {
    alert(event.currentTarget.value);
    if (onSubmit) {
      onSubmit(event);
    }
  }, []);

  return (
    <TextField
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.SearchField, className)}
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
      outerEndComponent={
        <SearchFieldButton onClick={onSubmitHandler} size={size} />
      }
      size={size}
      value={value}
      {...rest}
    />
  );
};
