import React from 'react';

import { Field } from '../components/Field';
import { ButtonElement, IconElement, ViewElement } from '../context/elements';
import { CLASS_BASE } from '../views/constants';
import { displayText } from '../displayText/en';

const BLOCK_NAME = `${CLASS_BASE}__search`;

const TOGGLE_BLOCK = 'toggle';

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
    <ViewElement className={BLOCK_NAME}>
      <Field
        icon={
          <IconElement
            className={`${BLOCK_NAME}__field__icon`}
            variant="search"
          />
        }
        className={`${BLOCK_NAME}__field`}
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
            className={`${BLOCK_NAME}__field-clear-button`}
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
        className={`${BLOCK_NAME}__submit-button`}
        onClick={() => onSearch?.()}
      >
        Submit
      </ButtonElement>
      {children ?? null}
    </ViewElement>
  );
};
