import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { TextField } from '../TextField';
import { FieldClearButton } from '../Field';
import { SearchFieldButton } from './SearchFieldButton';
import { isFunction, strHasLength } from '../shared/utils';
import { SearchFieldProps, PrimitiveWithForwardRef } from '../types';

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

  const onKeyDown = React.useCallback(
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

  const onInput = React.useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const onClick = React.useCallback(() => {
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

const SearchFieldPrimitive: PrimitiveWithForwardRef<SearchFieldProps, 'input'> =
  (
    {
      autoComplete = 'off',
      className,
      labelHidden = true,
      name = 'q',
      onSubmit,
      onClear,
      searchButtonRef,
      size,
      ...rest
    },
    ref
  ) => {
    const { value, onClearHandler, onInput, onKeyDown, onClick } =
      useSearchField({ onSubmit, onClear });

    return (
      <TextField
        autoComplete={autoComplete}
        className={classNames(ComponentClassNames.SearchField, className)}
        labelHidden={labelHidden}
        innerEndComponent={
          <FieldClearButton
            excludeFromTabOrder={true}
            isVisible={strHasLength(value)}
            onClick={onClearHandler}
            size={size}
            variation="link"
          />
        }
        isMultiline={false}
        name={name}
        onInput={onInput}
        onKeyDown={onKeyDown}
        outerEndComponent={
          <SearchFieldButton
            onClick={onClick}
            ref={searchButtonRef}
            size={size}
          />
        }
        ref={ref}
        size={size}
        value={value}
        {...rest}
      />
    );
  };

export const SearchField = React.forwardRef(SearchFieldPrimitive);

SearchField.displayName = 'SearchField';
