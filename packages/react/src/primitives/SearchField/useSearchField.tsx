import * as React from 'react';

import { isFunction } from '../shared/utils';
import { SearchFieldProps } from '../types';
import { useComposeRefsCallback } from '../../hooks/useComposeRefsCallback';

const ESCAPE_KEY = 'Escape';
const ENTER_KEY = 'Enter';
const DEFAULT_KEYS = [ESCAPE_KEY, ENTER_KEY];

export const useSearchField = ({
  onSubmit,
  onClear,
  externalRef,
}: Partial<
  SearchFieldProps & { externalRef: React.ForwardedRef<HTMLInputElement> }
>) => {
  const [value, setValue] = React.useState<string>('');
  const internalRef = React.useRef<HTMLInputElement>(null);
  const composeRefs = useComposeRefsCallback({ externalRef, internalRef });

  const onClearHandler = React.useCallback(() => {
    setValue('');
    internalRef?.current?.focus();
    if (isFunction(onClear)) {
      onClear();
    }
  }, [setValue, onClear]);

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
      const key = event.key;

      if (DEFAULT_KEYS.includes(key)) {
        event.preventDefault();
      }

      if (key === ESCAPE_KEY) {
        onClearHandler();
      } else if (key === ENTER_KEY) {
        onSubmitHandler(value);
      }
    },
    [value, onClearHandler, onSubmitHandler]
  );

  const onInput = React.useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [setValue]
  );

  const onClick = React.useCallback(() => {
    onSubmitHandler(value);
  }, [onSubmitHandler, value]);

  return {
    value,
    onClearHandler,
    onKeyDown,
    onInput,
    onClick,
    composeRefs,
  };
};
