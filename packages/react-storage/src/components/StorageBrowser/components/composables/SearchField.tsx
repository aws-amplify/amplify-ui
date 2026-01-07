import React from 'react';

import { Field, STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../base';
import { ButtonElement, IconElement } from '../elements';

export interface SearchFieldProps {
  id?: string;
  label?: string;
  clearLabel?: string;
  submitLabel?: string;
  query?: string;
  placeholder?: string;
  onSearch?: () => void;
  onClear?: () => void;
  onQueryChange?: (query: string) => void;
}

export const SearchField = ({
  id,
  label,
  clearLabel,
  submitLabel,
  onSearch,
  onClear,
  placeholder,
  query = '',
  onQueryChange,
}: SearchFieldProps): React.JSX.Element => {
  // FIXME: focus not returning to input field after clear

  return (
    <>
      <Field
        id={id}
        label={label}
        icon={
          <IconElement
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search-field-icon`}
            variant="search"
          />
        }
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search-field`}
        variant="search"
        onChange={(e) => {
          onQueryChange?.(e.target.value);
        }}
        placeholder={placeholder}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            onSearch?.();
          }
        }}
        value={query}
      >
        {query ? (
          <ButtonElement
            aria-label={clearLabel}
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search-field-clear`}
            onClick={onClear}
            variant="refresh"
          >
            <IconElement variant="dismiss" />
          </ButtonElement>
        ) : null}
      </Field>
      <ButtonElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search-submit`}
        onClick={onSearch}
      >
        {submitLabel}
      </ButtonElement>
    </>
  );
};
