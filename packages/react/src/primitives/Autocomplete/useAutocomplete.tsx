import * as React from 'react';

import {
  ARROW_DOWN,
  ARROW_UP,
  ENTER_KEY,
  ESCAPE_KEY,
} from '../shared/constants';
import { isFunction, strHasLength } from '../shared/utils';
import { useStableId } from '../utils/useStableId';
import type {
  ComboBoxOption,
  UseAutocomplete,
  UseAutocompleteProps,
} from '../types';

const DEFAULT_KEYS = new Set([ARROW_DOWN, ARROW_UP, ENTER_KEY, ESCAPE_KEY]);

export const useAutocomplete = ({
  defaultValue = '',
  value,
  options,
  optionFilter,
  onBlur,
  onChange,
  onClear,
  onClick,
  onSelect,
  onSubmit,
}: UseAutocompleteProps): UseAutocomplete => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const composedValue = isControlled ? value : internalValue;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeOption, setActiveOption] = React.useState<ComboBoxOption | null>(
    null
  );

  const isCustomFiltering = isFunction(optionFilter);
  const filteredOptions = React.useMemo(() => {
    const defaultFilter = (option: ComboBoxOption) => {
      const { label } = option;
      return label
        ?.toLocaleLowerCase()
        .includes(composedValue?.toLocaleLowerCase());
    };
    const filter = isCustomFiltering
      ? (option: ComboBoxOption) => optionFilter(option, composedValue)
      : defaultFilter;
    return options?.filter(filter) || [];
  }, [composedValue, optionFilter, isCustomFiltering, options]);

  const autocompleteId = useStableId();
  const listboxId = useStableId();
  const menuId = useStableId();
  const optionBaseId = useStableId();
  const activeIndex = filteredOptions.findIndex(
    (option) => option === activeOption
  );
  const activeOptionId =
    activeOption?.id ||
    (activeIndex !== -1 ? `${optionBaseId}-option-${activeIndex}` : undefined);

  const handleOnBlur: React.FocusEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        setIsMenuOpen(false);
        setActiveOption(null);
        if (isFunction(onBlur)) {
          onBlur(event);
        }
      },
      [onBlur]
    );

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        setActiveOption(null);
        setIsMenuOpen(true);
        if (!isControlled) {
          setInternalValue(event.target.value);
        }
        if (isFunction(onChange)) {
          onChange(event);
        }
      },
      [isControlled, onChange]
    );

  const handleOnClear = React.useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
    }

    if (isFunction(onClear)) {
      onClear();
    }
  }, [isControlled, onClear]);

  const handleOnClick: React.MouseEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        setIsMenuOpen(true);
        if (isFunction(onClick)) {
          onClick(event);
        }
      },
      [onClick]
    );

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { key } = event;

    if (!DEFAULT_KEYS.has(key)) {
      return;
    }

    event.preventDefault();

    switch (key) {
      case ESCAPE_KEY: {
        if (isMenuOpen) {
          setIsMenuOpen(false);
          setActiveOption(null);
        } else {
          handleOnClear();
        }
        break;
      }
      case ENTER_KEY: {
        if (!activeOption) {
          if (isFunction(onSubmit)) {
            onSubmit(composedValue);
          }
        } else {
          const { label } = activeOption;
          if (!isControlled) {
            setInternalValue(label);
          }

          if (isFunction(onSelect)) {
            onSelect(activeOption);
          }
        }
        setIsMenuOpen(false);
        setActiveOption(null);
        break;
      }
      case ARROW_DOWN: {
        if (filteredOptions.length <= 0) {
          return;
        }
        setIsMenuOpen(true);
        const newActiveIndex =
          activeIndex >= filteredOptions.length - 1 ? 0 : activeIndex + 1;
        setActiveOption(filteredOptions[newActiveIndex]);
        break;
      }
      case ARROW_UP: {
        if (filteredOptions.length <= 0) {
          return;
        }
        setIsMenuOpen(true);
        const newActiveIndex =
          activeIndex <= 0 ? filteredOptions.length - 1 : activeIndex - 1;
        setActiveOption(filteredOptions[newActiveIndex]);
      }
    }
  };

  // The window will scroll down to the right place to show the whole menu
  // if space is not enough in current viewport
  React.useEffect(() => {
    const autocompleteElement = document.getElementById(autocompleteId);
    const menuElement = document.getElementById(menuId);
    if (menuElement && isMenuOpen && autocompleteElement) {
      const { bottom } = menuElement.getBoundingClientRect();
      const { offsetParent, offsetTop } = autocompleteElement;

      if (
        offsetParent === document.body &&
        bottom > document.documentElement.clientHeight
      ) {
        window.scrollTo({
          top: Math.min(
            bottom -
              document.documentElement.clientHeight +
              window.scrollY +
              20, // Add 20 gap between menu bottom and window viewport bottom
            offsetTop
          ),
          behavior: 'smooth',
        });
      }
    }
  }, [autocompleteId, isMenuOpen, menuId]);

  // This will make the menu able to scroll with keyboard,
  // and scroll each option into window viewport if necessary
  React.useEffect(() => {
    const listboxElement = document.getElementById(listboxId);
    const activeOptionElement = strHasLength(activeOptionId)
      ? document.getElementById(activeOptionId)
      : null;

    if (activeOptionElement && listboxElement) {
      const { scrollTop, clientHeight } = listboxElement;
      const { offsetHeight, offsetTop } = activeOptionElement;
      const { top, bottom } = activeOptionElement.getBoundingClientRect();

      if (scrollTop > offsetTop) {
        listboxElement.scrollTop = offsetTop;
      }

      if (scrollTop + clientHeight < offsetTop + offsetHeight) {
        listboxElement.scrollTop = offsetTop + offsetHeight - clientHeight;
      }

      if (top < 0 || bottom > document.documentElement.clientHeight) {
        activeOptionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [activeOptionId, listboxId]);

  return {
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
  };
};
