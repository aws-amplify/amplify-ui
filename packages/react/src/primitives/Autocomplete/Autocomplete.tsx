import classNames from 'classnames';
import * as React from 'react';

import { AutocompleteOption } from './AutocompleteOption';
import { AutocompleteMenu } from './AutocompleteMenu';
import { useAutocomplete } from './useAutocomplete';
import { HighlightMatch } from '../HighlightMatch/HighlightMatch';
import { SearchField } from '../SearchField';
import { View } from '../View';
import { isFunction } from '../shared/utils';
import { ComponentClassNames } from '../shared/constants';
import type {
  AutocompleteComboboxProps,
  AutocompleteProps,
  ComboBoxOption,
  Primitive,
} from '../types';

export const AutocompletePrimitive: Primitive<AutocompleteProps, 'input'> = (
  {
    className,
    defaultValue,
    value,
    isLoading = false,
    menuSlots = {},
    options,
    optionFilter,
    onBlur,
    onChange,
    onClear,
    onClick,
    onSelect,
    onSubmit,
    renderOption,
    testId,
    ...rest
  },
  ref
) => {
  const {
    activeOptionId,
    autocompleteId,
    composedValue,
    filteredOptions,
    handleOnBlur,
    handleOnClear,
    handleOnClick,
    handleOnChange,
    handleOnKeyDown,
    isControlled,
    isCustomFiltering,
    isMenuOpen,
    listboxId,
    menuId,
    optionBaseId,
    setActiveOption,
    setIsMenuOpen,
    setInternalValue,
  } = useAutocomplete({
    defaultValue,
    value,
    options,
    optionFilter,
    onBlur,
    onChange,
    onClear,
    onClick,
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

  const Options = filteredOptions.map((option: ComboBoxOption, idx) => {
    const { id, label, ...rest } = option;

    const handleOnClick: React.MouseEventHandler<HTMLLIElement> = () => {
      setIsMenuOpen(false);
      setActiveOption(null);
      if (!isControlled) {
        setInternalValue(label);
      }
      if (isFunction(onSelect)) {
        onSelect(option);
      }
    };

    // This is required. Mousedown event will fire a blur event by default
    // and so the menu will close before the click event on an option gets a chance to fire
    const handleOnMouseDown: React.MouseEventHandler<HTMLLIElement> = (
      event
    ) => {
      event.preventDefault();
    };

    const handleOnMouseMove: React.MouseEventHandler<HTMLLIElement> = () => {
      setActiveOption(option);
    };

    const optionId = id ?? `${optionBaseId}-option-${idx}`;
    const isActive = optionId === activeOptionId;

    return (
      <AutocompleteOption
        isActive={isActive}
        id={optionId}
        key={optionId}
        onClick={handleOnClick}
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleOnMouseMove}
        {...rest}
      >
        {isFunction(renderOption) ? (
          renderOption(option, composedValue)
        ) : isCustomFiltering ? (
          label
        ) : (
          <HighlightMatch query={composedValue}>{label}</HighlightMatch>
        )}
      </AutocompleteOption>
    );
  });

  return (
    <View
      className={classNames(ComponentClassNames.Autocomplete, className)}
      id={autocompleteId}
      testId={testId}
    >
      <SearchField
        hasSearchButton={false}
        hasSearchIcon
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        onClear={handleOnClear}
        onClick={handleOnClick}
        onKeyDown={handleOnKeyDown}
        ref={ref}
        value={composedValue}
        {...comboboxProps}
        {...rest}
      />
      {isMenuOpen ? (
        <AutocompleteMenu
          id={menuId}
          isLoading={isLoading}
          listboxId={listboxId}
          {...menuSlots}
        >
          {Options}
        </AutocompleteMenu>
      ) : null}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/autocomplete)
 */
export const Autocomplete = React.forwardRef(AutocompletePrimitive);

Autocomplete.displayName = 'Autocomplete';
