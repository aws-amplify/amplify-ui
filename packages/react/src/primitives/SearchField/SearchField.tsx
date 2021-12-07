import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { FieldClearButton } from '../Field';
import { strHasLength } from '../shared/utils';
import { SearchFieldButton } from './SearchFieldButton';
import { SearchFieldProps, Primitive } from '../types';
import { TextField } from '../TextField';
import { useSearchField } from './useSearchField';

const SearchFieldPrimitive: Primitive<SearchFieldProps, 'input'> = (
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
  const { value, onClearHandler, onInput, onKeyDown, onClick, composeRefs } =
    useSearchField({ onSubmit, onClear, externalRef: ref });

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
      ref={composeRefs}
      size={size}
      value={value}
      {...rest}
    />
  );
};

export const SearchField = React.forwardRef(SearchFieldPrimitive);

SearchField.displayName = 'SearchField';
