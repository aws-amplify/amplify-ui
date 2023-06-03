import classNames from 'classnames';
import * as React from 'react';

import { FieldClearButton } from '../Field';
import { FieldGroupIcon } from '../FieldGroupIcon';
import { IconSearch } from '../Icon/internal';
import { SearchFieldButton } from './SearchFieldButton';
import { TextField } from '../TextField';
import { useSearchField } from './useSearchField';
import { ComponentClassNames } from '../shared/constants';
import { strHasLength } from '../shared/utils';
import type {
  BaseSearchFieldProps,
  SearchFieldProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';

const SearchFieldPrimitive: Primitive<SearchFieldProps, 'input'> = (
  {
    autoComplete = 'off',
    className,
    isDisabled,
    clearButtonLabel,
    labelHidden = true,
    name = 'q',
    hasSearchButton = true,
    hasSearchIcon = false,
    onChange,
    onClear,
    onSubmit,
    searchButtonRef,
    size,
    defaultValue,
    value,
    ...rest
  },
  ref
) => {
  const {
    composedValue,
    onClearHandler,
    onKeyDown,
    onClick,
    handleOnChange,
    composedRefs,
  } = useSearchField({
    defaultValue,
    value,
    onChange,
    onClear,
    onSubmit,
    externalRef: ref,
  });

  const SearchButton = hasSearchButton ? (
    <SearchFieldButton
      isDisabled={isDisabled}
      onClick={onClick}
      ref={searchButtonRef}
      size={size}
    />
  ) : undefined;

  const SearchIcon = hasSearchIcon ? (
    <FieldGroupIcon>
      <IconSearch />
    </FieldGroupIcon>
  ) : undefined;

  return (
    <TextField
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.SearchField, className)}
      labelHidden={labelHidden}
      innerStartComponent={SearchIcon}
      innerEndComponent={
        <FieldClearButton
          ariaLabel={clearButtonLabel}
          excludeFromTabOrder
          isVisible={!isDisabled && strHasLength(composedValue)}
          onClick={onClearHandler}
          size={size}
          variation="link"
        />
      }
      isDisabled={isDisabled}
      name={name}
      onChange={handleOnChange}
      onKeyDown={onKeyDown}
      outerEndComponent={SearchButton}
      ref={composedRefs}
      size={size}
      value={composedValue}
      {...rest}
    />
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/searchfield)
 */
export const SearchField: ForwardRefPrimitive<BaseSearchFieldProps, 'input'> =
  React.forwardRef(SearchFieldPrimitive);

SearchField.displayName = 'SearchField';
