import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../constants';
import { InputElement, ViewElement, LabelElement } from '../context/elements/';

const SEARCH_SUBFOLDERS_TOGGLE_ID = 'search-subfolders-toggle';

export interface SearchSubfoldersToggleProps {
  isSearchingSubfolders?: boolean;
  label?: string;
  onToggle?: () => void;
}

export const SearchSubfoldersToggle = ({
  isSearchingSubfolders,
  label,
  onToggle,
}: SearchSubfoldersToggleProps): React.JSX.Element => (
  <ViewElement className={`${STORAGE_BROWSER_BLOCK}__search-subfolders-toggle`}>
    <InputElement
      checked={isSearchingSubfolders}
      id={SEARCH_SUBFOLDERS_TOGGLE_ID}
      onChange={onToggle}
      type="checkbox"
    />
    <LabelElement htmlFor={SEARCH_SUBFOLDERS_TOGGLE_ID}>{label}</LabelElement>
  </ViewElement>
);
