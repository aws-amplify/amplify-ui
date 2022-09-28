import * as React from 'react';

import { isFunction } from '../shared/utils';
import { UseSearchFieldProps } from '../types';
import { useComposeRefsCallback } from '../../hooks/useComposeRefsCallback';

const ESCAPE_KEY = 'Escape';
const ENTER_KEY = 'Enter';
const DEFAULT_KEYS = new Set([ESCAPE_KEY, ENTER_KEY]);

export const useSearchField = ({
  defaultValue,
  value,
  onChange,
  onSubmit,
  onClear,
  externalRef,
}: UseSearchFieldProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] =
    React.useState<string>(defaultValue);
  const composedValue = isControlled ? value : internalValue;

  const internalRef = React.useRef<HTMLInputElement>(null);
  const composedRefs = useComposeRefsCallback({ externalRef, internalRef });

  const onClearHandler = React.useCallback(() => {
    setInternalValue('');
    internalRef?.current?.focus();
    if (isFunction(onClear)) {
      onClear();
    }
  }, [onClear]);

  const onSubmitHandler = React.useCallback(
    (value: string) => {
      if (isFunction(onSubmit)) {
        onSubmit(value);
      }
    },
    [onSubmit]
  );

  const onKeyDown = React.useCallback(
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

  const onInput = React.useCallback(
    (event) => {
      setInternalValue(event.target.value);
      if (isFunction(onChange)) {
        onChange(event);
      }
    },
    [onChange]
  );

  const onClick = React.useCallback(() => {
    onSubmitHandler(composedValue);
  }, [onSubmitHandler, composedValue]);

  return {
    composedValue,
    onClearHandler,
    onKeyDown,
    onInput,
    onClick,
    composedRefs,
  };
};
