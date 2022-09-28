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
    isDisabled,
    clearButtonLabel,
    labelHidden = true,
    name = 'q',
    defaultValue = '',
    value,
    isLoading,
    hasSearchButton,
    hasSearchIcon,
    suggestionsMenu,
    renderSuggestion,
    filterSuggestion,
    onSuggestionSelect,
    onChange,
    onSubmit,
    onClear,
    searchButtonRef,
    size,
    ...rest
  },
  ref
) => {
  const {
    composedValue,
    onClearHandler,
    onInput,
    onKeyDown,
    onClick,
    composedRefs,
  } = useSearchField({
    defaultValue,
    value,
    onChange,
    onSubmit,
    onClear,
    externalRef: ref,
  });

  return (
    <TextField
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.SearchField, className)}
      labelHidden={labelHidden}
      innerEndComponent={
        <FieldClearButton
          ariaLabel={clearButtonLabel}
          excludeFromTabOrder={true}
          isVisible={strHasLength(composedValue)}
          onClick={onClearHandler}
          size={size}
          variation="link"
        />
      }
      isDisabled={isDisabled}
      isMultiline={false}
      name={name}
      onInput={onInput}
      onKeyDown={onKeyDown}
      outerEndComponent={
        <SearchFieldButton
          isDisabled={isDisabled}
          onClick={onClick}
          ref={searchButtonRef}
          size={size}
        />
      }
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
export const SearchField = React.forwardRef(SearchFieldPrimitive);

SearchField.displayName = 'SearchField';
