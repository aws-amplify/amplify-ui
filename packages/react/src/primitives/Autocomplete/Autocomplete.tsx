import classNames from 'classnames';
import * as React from 'react';

import { AutocompleteMenu } from './AutocompleteMenu';
import { useAutocomplete } from './useAutocomplete';
import { SearchField } from '../SearchField';
import { View } from '../View';
import { ComponentClassNames } from '../shared/constants';
import type {
  AutocompleteComboboxProps,
  AutocompleteProps,
  Primitive,
} from '../types';

export const AutocompletePrimitive: Primitive<AutocompleteProps, 'input'> = (
  {
    className,
    defaultValue,
    value,
    filteringOption,
    isLoading = false,
    menu,
    options,
    onBlur,
    onChange,
    onClear,
    onClick,
    onFocus,
    onSelect,
    onSubmit,
    renderOption,
    testId,
    ...rest
  },
  ref
) => {
  const {
    activeIdx,
    activeOptionId,
    composedValue,
    filteredOptions,
    handleOnBlur,
    handleOnClear,
    handleOnClick,
    handleOnFocus,
    handleOnChange,
    handleOnKeyDown,
    isControlled,
    isCustomFiltering,
    isMenuOpen,
    listboxId,
    menuId,
    optionBaseId,
    setActiveIdx,
    setIsMenuOpen,
    setInternalValue,
  } = useAutocomplete({
    defaultValue,
    value,
    options,
    filteringOption,
    onBlur,
    onChange,
    onClear,
    onClick,
    onFocus,
    onSelect,
    onSubmit,
  });

  const comboboxProps: AutocompleteComboboxProps = {
    role: 'combobox',
    'aria-activedescendant': activeOptionId,
    'aria-autocomplete': 'list',
    'aria-controls': isMenuOpen ? menuId : undefined,
    'aria-expanded': isMenuOpen,
    'aria-haspopup': 'listbox',
    'aria-owns': isMenuOpen ? menuId : undefined,
  };

  return (
    <View
      className={classNames(ComponentClassNames.Autocomplete, className)}
      testId={testId}
    >
      <SearchField
        hasSearchButton={false}
        hasSearchIcon={true}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onClear={handleOnClear}
        onClick={handleOnClick}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        ref={ref}
        value={composedValue}
        {...comboboxProps}
        {...rest}
      />
      {isMenuOpen ? (
        <AutocompleteMenu
          activeIdx={activeIdx}
          activeOptionId={activeOptionId}
          id={menuId}
          isControlled={isControlled}
          isCustomFiltering={isCustomFiltering}
          isLoading={isLoading}
          isOpen={isMenuOpen}
          onSelect={onSelect}
          listboxId={listboxId}
          optionBaseId={optionBaseId}
          options={filteredOptions}
          menu={menu}
          renderOption={renderOption}
          setActiveIdx={setActiveIdx}
          setIsOpen={setIsMenuOpen}
          setValue={setInternalValue}
          value={composedValue}
        />
      ) : null}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/autocomplete)
 */
export const Autocomplete = React.forwardRef(AutocompletePrimitive);

Autocomplete.displayName = 'Autocomplete';
