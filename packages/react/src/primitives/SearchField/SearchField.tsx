import classNames from 'classnames';
import * as React from 'react';

import { HighlightMatch } from './HighlightMatch';
import { FieldClearButton } from '../Field';
import { FieldGroupIcon } from '../FieldGroupIcon';
import { Flex } from '../Flex';
import { IconSearch } from '../Icon/internal';
import { Loader } from '../Loader';
import { SearchFieldButton } from './SearchFieldButton';
import { SearchFieldSuggestion } from './SearchFieldSuggestion';
import { TextField } from '../TextField';
import { ScrollView } from '../ScrollView';
import { View } from '../View';
import { useSearchField } from './useSearchField';
import { ComponentClassNames } from '../shared/constants';
import {
  classNameModifierByFlag,
  isFunction,
  strHasLength,
} from '../shared/utils';
import { useStableId } from '../utils/useStableId';
import type { SearchFieldProps, Suggestion, Primitive } from '../types';

const defaultSuggestionsMenu = {
  ariaLabel: null,
  Header: null,
  Footer: null,
  Loading: null,
  Empty: null,
};

interface ComboboxProps {
  role: React.AriaRole;
  'aria-activedescendant': React.AriaAttributes['aria-activedescendant'];
  'aria-autocomplete': React.AriaAttributes['aria-autocomplete'];
  'aria-controls': React.AriaAttributes['aria-controls'];
  'aria-expanded': React.AriaAttributes['aria-expanded'];
  'aria-haspopup': React.AriaAttributes['aria-haspopup'];
  'aria-owns': React.AriaAttributes['aria-owns'];
}

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
    suggestionsMenu = defaultSuggestionsMenu,
    filteringType = 'auto',
    renderSuggestion,
    onSuggestionSelect,
    onBlur,
    onInput,
    onClick,
    onFocus,
    onSubmit,
    onClear,
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
    handleOnInput,
    onKeyDown,
    onSearchButtonClick,
    composedRefs,
  } = useSearchField({
    defaultValue,
    value,
    suggestions,
    filteringType,
    onInput,
    onSubmit,
    onSuggestionSelect,
    onClear,
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

  const Header = () => {
    return (
      suggestionsMenu.Header && (
        <Flex className={ComponentClassNames.SearchFieldMenuHeader}>
          {suggestionsMenu.Header}
        </Flex>
      )
    );
  };

  const Footer = () => {
    return (
      suggestionsMenu.Footer && (
        <Flex className={ComponentClassNames.SearchFieldMenuFooter}>
          {suggestionsMenu.Footer}
        </Flex>
      )
    );
  };

  const Loading = () =>
    suggestionsMenu.Loading ? (
      <Flex>{suggestionsMenu.Loading}</Flex>
    ) : (
      <Flex className={ComponentClassNames.SearchFieldMenuLoading}>
        <Loader />
        Loading suggestions...
      </Flex>
    );

  const NoSuggestions = () =>
    suggestionsMenu.Empty ? (
      <Flex className={ComponentClassNames.SearchFieldMenuEmpty}>
        {suggestionsMenu.Empty}
      </Flex>
    ) : (
      <Flex className={ComponentClassNames.SearchFieldMenuEmpty}>
        No suggestions found
      </Flex>
    );

  const handleOnClick: React.MouseEventHandler<HTMLInputElement> = (event) => {
    setIsMenuOpen(true);
    if (isFunction(onClick)) {
      onClick(event);
    }
  };

  const handleOnBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsMenuOpen(false);
    setActiveIdx(-1);
    if (isFunction(onBlur)) {
      onBlur(event);
    }
  };

  const handleOnFocus: React.FocusEventHandler<HTMLInputElement> = (event) => {
    setIsMenuOpen(true);
    if (isFunction(onFocus)) {
      onFocus(event);
    }
  };

  const { ariaLabel } = suggestionsMenu;
  const suggestionBaseId = useStableId();
  const hasSuggestions = Array.isArray(suggestions);
  const shouldRenderSuggestionsMenu = hasSuggestions && isMenuOpen;
  const Suggestions = () => {
    return filteredSuggestions.length > 0 ? (
      <ScrollView
        as="ul"
        role="listbox"
        ariaLabel={ariaLabel}
        className={ComponentClassNames.SearchFieldMenuSuggestions}
        id={menuId}
      >
        {filteredSuggestions.map((suggestion: Suggestion, idx) => {
          const { id, label } = suggestion;
          const isActive = activeIdx === idx;

          const handleOnClick: React.MouseEventHandler<HTMLLIElement> = () => {
            setIsMenuOpen(false);
            setActiveIdx(-1);
            if (!isControlled) {
              setInternalValue(label);
            }
            if (isFunction(onSuggestionSelect)) {
              onSuggestionSelect(suggestion);
            }
          };

          const handleOnMouseDown: React.MouseEventHandler<HTMLLIElement> = (
            event
          ) => {
            event.preventDefault();
          };

          const handleOnMouseMove: React.MouseEventHandler<HTMLLIElement> =
            () => {
              setActiveIdx(idx);
            };

          const suggestionId = `${suggestionBaseId}-suggestion-${idx}`;

          return (
            <SearchFieldSuggestion
              aria-selected={isActive}
              className={classNameModifierByFlag(
                ComponentClassNames.SearchFieldMenuSuggestion,
                'active',
                isActive
              )}
              id={id || suggestionId}
              key={id || suggestionId}
              onClick={handleOnClick}
              onMouseDown={handleOnMouseDown}
              onMouseMove={handleOnMouseMove}
            >
              <HighlightMatch query={composedValue}>{label}</HighlightMatch>
            </SearchFieldSuggestion>
          );
        })}
      </ScrollView>
    ) : (
      <NoSuggestions />
    );
  };
  const menuId = useStableId();

  const activeSuggestion = filteredSuggestions[activeIdx];
  const comboboxProps: ComboboxProps = hasSuggestions
    ? {
        role: 'combobox',
        'aria-activedescendant':
          activeSuggestion?.id ||
          (activeIdx !== -1
            ? `${suggestionBaseId}-suggestion-${activeIdx}`
            : undefined),
        'aria-autocomplete': 'list',
        'aria-controls': menuId,
        'aria-expanded': isMenuOpen,
        'aria-haspopup': 'listbox',
        'aria-owns': menuId,
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
        onKeyDown={onKeyDown}
        outerEndComponent={SearchButton}
        ref={composedRefs}
        size={size}
        value={composedValue}
        {...comboboxProps}
        {...rest}
      />
      {shouldRenderSuggestionsMenu ? (
        <ScrollView className={ComponentClassNames.SearchFieldMenu}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <Header />
              <Suggestions />
              <Footer />
            </>
          )}
        </ScrollView>
      ) : null}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/searchfield)
 */
export const SearchField = React.forwardRef(SearchFieldPrimitive);

SearchField.displayName = 'SearchField';
