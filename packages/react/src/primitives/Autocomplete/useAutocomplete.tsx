import * as React from 'react';

import {
  ARROW_DOWN,
  ARROW_UP,
  ENTER_KEY,
  ESCAPE_KEY,
} from '../shared/constants';
import { isFunction } from '../shared/utils';
import { useStableId } from '../utils/useStableId';
import type { Option, UseAutocompleteProps } from '../types';

const DEFAULT_KEYS = new Set([ARROW_DOWN, ARROW_UP, ENTER_KEY, ESCAPE_KEY]);

export const useAutocomplete = ({
  defaultValue = '',
  value,
  options = [],
  optionFilter,
  onBlur,
  onChange,
  onClear,
  onClick,
  onFocus,
  onSelect,
  onSubmit,
}: UseAutocompleteProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const composedValue = isControlled ? value : internalValue;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(-1);

  const isCustomFiltering = isFunction(optionFilter);
  const filteredOptions = React.useMemo(() => {
    const defaultFilter = (option: Option) => {
      const { label } = option;
      return label
        ?.toLocaleLowerCase()
        .includes(composedValue?.toLocaleLowerCase());
    };
    const filter = isCustomFiltering
      ? (option: Option) => optionFilter(option, composedValue)
      : defaultFilter;
    return options.filter(filter);
  }, [composedValue, optionFilter, isCustomFiltering, options]);

  const listboxId = useStableId();
  const menuId = useStableId();
  const optionBaseId = useStableId();
  const activeOption = Array.isArray(filteredOptions)
    ? filteredOptions[activeIdx]
    : undefined;
  const activeOptionId =
    activeOption?.id ||
    (activeIdx !== -1 ? `${optionBaseId}-option-${activeIdx}` : undefined);

  const handleOnBlur: React.FocusEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        setIsMenuOpen(false);
        setActiveIdx(-1);
        if (isFunction(onBlur)) {
          onBlur(event);
        }
      },
      [onBlur]
    );

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        setActiveIdx(-1);
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

  const handleOnFocus: React.FocusEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        setIsMenuOpen(true);
        if (isFunction(onFocus)) {
          onFocus(event);
        }
      },
      [onFocus]
    );

  const handleOnKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback(
      (event) => {
        const { key } = event;

        if (!DEFAULT_KEYS.has(key)) {
          return;
        }

        event.preventDefault();

        switch (key) {
          case ESCAPE_KEY:
            if (isMenuOpen) {
              setIsMenuOpen(false);
              setActiveIdx(-1);
            } else {
              handleOnClear();
            }
            break;
          case ENTER_KEY:
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
            setActiveIdx(-1);
            break;
          case ARROW_DOWN:
            if (filteredOptions.length <= 0) {
              return;
            }
            setIsMenuOpen(true);
            setActiveIdx(
              activeIdx >= filteredOptions.length - 1 ? 0 : activeIdx + 1
            );
            break;
          case ARROW_UP:
            if (filteredOptions.length <= 0) {
              return;
            }
            setIsMenuOpen(true);
            setActiveIdx(
              activeIdx <= 0 ? filteredOptions.length - 1 : activeIdx - 1
            );
        }
      },
      [
        activeIdx,
        activeOption,
        composedValue,
        filteredOptions,
        handleOnClear,
        isControlled,
        isMenuOpen,
        onSelect,
        onSubmit,
      ]
    );

  React.useEffect(() => {
    const menuElement = document.getElementById(menuId);
    if (menuElement && isMenuOpen) {
      const { top, bottom } = menuElement.getBoundingClientRect();

      if (top < 0 || bottom > document.documentElement.clientHeight) {
        window.scrollTo({
          top:
            bottom -
            document.documentElement.clientHeight +
            window.scrollY +
            20,
          behavior: 'smooth',
        });
      }
    }
  }, [isMenuOpen, menuId]);

  React.useEffect(() => {
    const listboxElement = document.getElementById(listboxId);
    const activeOptionElement = document.getElementById(activeOptionId);

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
  };
};
