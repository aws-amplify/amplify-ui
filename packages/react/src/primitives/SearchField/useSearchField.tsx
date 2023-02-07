import * as React from 'react';

import { ESCAPE_KEY, ENTER_KEY } from '../shared/constants';
import { isFunction } from '../shared/utils';
import { UseSearchFieldProps } from '../types';
import { useComposeRefsCallback } from '../../hooks/useComposeRefsCallback';

const DEFAULT_KEYS = new Set([ESCAPE_KEY, ENTER_KEY]);

type ClearHandler = React.MouseEventHandler<HTMLButtonElement>;
type ClickHandler = React.MouseEventHandler<HTMLButtonElement>;
type KeyDownHandler = React.KeyboardEventHandler<HTMLInputElement>;
type ChangeHandler = React.ChangeEventHandler<HTMLInputElement>;

interface UseSearchField {
  composedValue: string;
  onClearHandler: ClearHandler;
  onClick: ClickHandler;
  onKeyDown: KeyDownHandler;
  handleOnChange: ChangeHandler;
  composedRefs: React.Ref<HTMLInputElement>;
}

export const useSearchField = ({
  defaultValue = '',
  value,
  onChange,
  onClear,
  onSubmit,
  externalRef,
}: UseSearchFieldProps): UseSearchField => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] =
    React.useState<string>(defaultValue);
  const composedValue = isControlled ? value : internalValue;

  const internalRef = React.useRef<HTMLInputElement>(null);
  const composedRefs = useComposeRefsCallback<HTMLInputElement | null>({
    externalRef,
    internalRef,
  });

  const onClearHandler = React.useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
    }
    internalRef?.current?.focus();
    if (isFunction(onClear)) {
      onClear();
    }
  }, [isControlled, setInternalValue, onClear]);

  const onSubmitHandler = React.useCallback(
    (value: string) => {
      if (isFunction(onSubmit)) {
        onSubmit(value);
      }
    },
    [onSubmit]
  );

  const onKeyDown: KeyDownHandler = React.useCallback(
    (event) => {
      const { key } = event;

      if (!DEFAULT_KEYS.has(key)) {
        return;
      }

      event.preventDefault();

      if (key === ESCAPE_KEY) {
        onClearHandler();
      } else if (key === ENTER_KEY) {
        onSubmitHandler(composedValue);
      }
    },
    [composedValue, onClearHandler, onSubmitHandler]
  );

  const handleOnChange: ChangeHandler = React.useCallback(
    (event) => {
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      if (isFunction(onChange)) {
        onChange(event);
      }
    },
    [isControlled, onChange, setInternalValue]
  );

  const onClick = React.useCallback(() => {
    onSubmitHandler(composedValue);
  }, [onSubmitHandler, composedValue]);

  return {
    composedValue,
    onClearHandler,
    onKeyDown,
    onClick,
    handleOnChange,
    composedRefs,
  };
};
