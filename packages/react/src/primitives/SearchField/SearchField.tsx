import classNames from 'classnames';
import * as React from 'react';

import { FieldClearButton } from '../Field';
import { FieldGroupIcon } from '../FieldGroupIcon';
import { IconSearch } from '../Icon/internal';
import { SearchFieldButton } from './SearchFieldButton';
import { SearchFieldSuggestionMenu } from './SearchFieldSuggestionMenu';
import { TextField } from '../TextField';
import { View } from '../View';
import { useSearchField } from './useSearchField';
import { ComponentClassNames } from '../shared/constants';
import { strHasLength } from '../shared/utils';
import { useStableId } from '../utils/useStableId';
import type {
  SearchFieldComboboxProps,
  SearchFieldProps,
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
    defaultValue = '',
    value,
    suggestions,
    isLoading,
    hasSearchButton = true,
    hasSearchIcon,
    suggestionMenu,
    filteringType = 'auto',
    renderSuggestion,
    onBlur,
    onClear,
    onClick,
    onFocus,
    onInput,
    onSubmit,
    onSuggestionSelect,
    searchButtonRef,
    size,
    ...rest
  },
  ref
) => {
  const {
    activeIdx,
    filteredSuggestions,
    isControlled,
    isMenuOpen,
    setActiveIdx,
    setIsMenuOpen,
    setInternalValue,
    composedValue,
    onClearHandler,
    handleOnBlur,
    handleOnClick,
    handleOnFocus,
    handleOnInput,
    handleOnKeyDown,
    onSearchButtonClick,
    composedRefs,
  } = useSearchField({
    defaultValue,
    value,
    suggestions,
    filteringType,
    onBlur,
    onClear,
    onClick,
    onFocus,
    onInput,
    onSubmit,
    onSuggestionSelect,
    externalRef: ref,
  });

  const SearchIcon = hasSearchIcon ? (
    <FieldGroupIcon>
      <IconSearch />
    </FieldGroupIcon>
  ) : null;

  const SearchButton = hasSearchButton ? (
    <SearchFieldButton
      isDisabled={isDisabled}
      onClick={onSearchButtonClick}
      ref={searchButtonRef}
      size={size}
    />
  ) : null;

  const hasSuggestions = Array.isArray(suggestions);
  const shouldRenderSuggestionMenu = hasSuggestions && isMenuOpen;

  const menuId = useStableId();
  const suggestionBaseId = useStableId();

  const activeSuggestion = filteredSuggestions[activeIdx];
  const activeSuggestionId =
    activeSuggestion?.id ||
    (activeIdx !== -1
      ? `${suggestionBaseId}-suggestion-${activeIdx}`
      : undefined);

  const comboboxProps: SearchFieldComboboxProps = hasSuggestions
    ? {
        role: 'combobox',
        'aria-activedescendant': activeSuggestionId,
        'aria-autocomplete': 'list',
        'aria-controls': isMenuOpen ? menuId : undefined,
        'aria-expanded': isMenuOpen,
        'aria-haspopup': 'listbox',
        'aria-owns': isMenuOpen ? menuId : undefined,
      }
    : {
        role: undefined,
        'aria-activedescendant': undefined,
        'aria-autocomplete': undefined,
        'aria-controls': undefined,
        'aria-expanded': undefined,
        'aria-haspopup': undefined,
        'aria-owns': undefined,
      };

  return (
    <View className={ComponentClassNames.SearchFieldWrapper}>
      <TextField
        autoComplete={autoComplete}
        className={classNames(ComponentClassNames.SearchField, className)}
        labelHidden={labelHidden}
        innerStartComponent={SearchIcon}
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
        onBlur={handleOnBlur}
        onClick={handleOnClick}
        onFocus={handleOnFocus}
        onInput={handleOnInput}
        onKeyDown={handleOnKeyDown}
        outerEndComponent={SearchButton}
        ref={composedRefs}
        size={size}
        value={composedValue}
        {...comboboxProps}
        {...rest}
      />
      {shouldRenderSuggestionMenu ? (
        <SearchFieldSuggestionMenu
          activeIdx={activeIdx}
          activeSuggestionId={activeSuggestionId}
          filteringType={filteringType}
          id={menuId}
          isControlled={isControlled}
          isLoading={isLoading}
          isOpen={isMenuOpen}
          onSuggestionSelect={onSuggestionSelect}
          renderSuggestion={renderSuggestion}
          setActiveIdx={setActiveIdx}
          setIsMenuOpen={setIsMenuOpen}
          setInternalValue={setInternalValue}
          suggestionBaseId={suggestionBaseId}
          suggestions={filteredSuggestions}
          suggestionMenu={suggestionMenu}
          value={composedValue}
        />
      ) : null}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/searchfield)
 */
export const SearchField = React.forwardRef(SearchFieldPrimitive);

SearchField.displayName = 'SearchField';
