import * as React from 'react';

import {
  ARROW_DOWN,
  ARROW_UP,
  ENTER_KEY,
  ESCAPE_KEY,
} from '../shared/constants';
import { isFunction } from '../shared/utils';
import type { Option, UseAutocompleteProps } from '../types';

const DEFAULT_KEYS = new Set([ARROW_DOWN, ARROW_UP, ENTER_KEY, ESCAPE_KEY]);

export const useAutocomplete = ({
  defaultValue = '',
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
}: UseAutocompleteProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const composedValue = isControlled ? value : internalValue;

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(-1);

  const filteredOptions = React.useMemo(() => {
    const filter =
      filteringType === 'auto'
        ? (option: Option) => {
            const { label } = option;
            return label
              ?.toLocaleLowerCase()
              .includes(composedValue?.toLocaleLowerCase());
          }
        : () => true;
    return options?.filter(filter) || [];
  }, [composedValue, filteringType, options]);

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
            const activeOption = filteredOptions[activeIdx];
            if (!activeOption) {
              onSubmit(composedValue);
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
        composedValue,
        filteredOptions,
        handleOnClear,
        isControlled,
        isMenuOpen,
        onSelect,
        onSubmit,
      ]
    );

  return {
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
  };
};
