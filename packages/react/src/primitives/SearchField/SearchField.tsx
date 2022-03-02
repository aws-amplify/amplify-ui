import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared/constants';
import { FieldClearButton } from '../Field';
import { LABEL_HIDDEN_DEPRECATED } from '../../helpers/messages';
import { SearchFieldButton } from './SearchFieldButton';
import { SearchFieldProps, Primitive } from '../types';
import { strHasLength } from '../shared/utils';
import { TextField } from '../TextField';
import { useDeprecationWarning } from '../../hooks/useDeprecationWarning';
import { useSearchField } from './useSearchField';

const SearchFieldPrimitive: Primitive<SearchFieldProps, 'input'> = (
  {
    autoComplete = 'off',
    className,
    isLabelHidden = true,
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
  const { value, onClearHandler, onInput, onKeyDown, onClick, composedRefs } =
    useSearchField({ onSubmit, onClear, externalRef: ref });

  useDeprecationWarning({
    shouldWarn: labelHidden,
    message: LABEL_HIDDEN_DEPRECATED,
  });

  return (
    <TextField
      autoComplete={autoComplete}
      className={classNames(ComponentClassNames.SearchField, className)}
      isLabelHidden={isLabelHidden || labelHidden}
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
      ref={composedRefs}
      size={size}
      value={value}
      {...rest}
    />
  );
};

export const SearchField = React.forwardRef(SearchFieldPrimitive);

SearchField.displayName = 'SearchField';
