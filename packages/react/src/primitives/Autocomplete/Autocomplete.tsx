import classNames from 'classnames';
import * as React from 'react';

import { AutocompleteMenu } from './AutocompleteMenu';
import { useAutocomplete } from './useAutocomplete';
import { TextField } from '../TextField';
import { SearchField } from '../SearchField';
import { View } from '../View';
import type {
  AutocompleteComboboxProps,
  AutocompleteProps,
  Primitive,
} from '../types';
import { useStableId } from '../utils/useStableId';
import { ComponentClassName } from '../shared/types';

export const AutocompletePrimitive: Primitive<AutocompleteProps, 'input'> = (
  {
    className,
    defaultValue,
    value,
    filteringType = 'auto',
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
    ...rest
  },
  ref
) => {
  const {
    activeIdx,
    filteredOptions,
    isControlled,
    composedValue,
    isMenuOpen,
    setActiveIdx,
    setIsMenuOpen,
    setInternalValue,
    handleOnBlur,
    handleOnClear,
    handleOnClick,
    handleOnFocus,
    handleOnChange,
    handleOnKeyDown,
  } = useAutocomplete({
    defaultValue,
    value,
    options,
    filteringType,
    onBlur,
    onChange,
    onClear,
    onClick,
    onFocus,
    onSelect,
    onSubmit,
  });

  const listboxId = useStableId();

  const optionBaseId = useStableId();

  const activeOption = filteredOptions[activeIdx];
  const activeOptionId =
    activeOption?.id ||
    (activeIdx !== -1 ? `${optionBaseId}-option-${activeIdx}` : undefined);

  const comboboxProps: AutocompleteComboboxProps = {
    role: 'combobox',
    'aria-activedescendant': activeOptionId,
    'aria-autocomplete': 'list',
    'aria-controls': isMenuOpen ? listboxId : undefined,
    'aria-expanded': isMenuOpen,
    'aria-haspopup': 'listbox',
    'aria-owns': isMenuOpen ? listboxId : undefined,
  };

  return (
    <View className={classNames(ComponentClassName.Autocomplete, className)}>
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
          filteringType={filteringType}
          isControlled={isControlled}
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
