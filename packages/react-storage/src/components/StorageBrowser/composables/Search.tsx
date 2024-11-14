import React from 'react';

import { Field } from '../components/Field';
import { ButtonElement, IconElement, ViewElement } from '../context/elements';
import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../constants';
import { displayText } from '../displayText/en';

export interface SearchProps {
  onSearch?: () => void;
  onSearchClear?: () => void;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
}

export const Search = ({
  onSearch,
  onSearchClear,
  searchPlaceholder,
  searchQuery = '',
  onSearchQueryChange,
  children,
}: SearchProps): React.JSX.Element => {
  // FIXME: focus not returning to input field after clear

  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search`}>
      <Field
        icon={
          <IconElement
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search-field-icon`}
            variant="search"
          />
        }
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search-field`}
        variant="search"
        onChange={(e) => {
          onSearchQueryChange?.(e.target.value);
        }}
        placeholder={searchPlaceholder}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            onSearch?.();
          }
        }}
        value={searchQuery}
      >
        {searchQuery ? (
          <ButtonElement
            aria-label={displayText.searchClearLabel}
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search-field-clear`}
            onClick={() => {
              onSearchClear?.();
            }}
            variant="refresh"
          >
            <IconElement variant="dismiss" />
          </ButtonElement>
        ) : null}
      </Field>
      <ButtonElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search-submit`}
        onClick={() => onSearch?.()}
      >
        Submit
      </ButtonElement>
      {children ?? null}
    </ViewElement>
  );
};
