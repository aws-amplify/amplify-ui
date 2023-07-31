import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FieldContext } from './FieldContext';
import { FieldProviderProps, Handler } from './types';

export default function FieldProvider<
  OnBlur extends Handler,
  OnChange extends Handler
>({
  children,
  disabled,
  name,
  onBlur,
  onChange,
  validate,
}: FieldProviderProps<OnBlur, OnChange>): JSX.Element {
  const { formState, getFieldState, register } = useFormContext();

  const value = React.useMemo(() => {
    const { disabled: _disabled = false, ...registeredProps } = register(name, {
      disabled,
      onBlur,
      onChange,
      validate,
    });

    const { error: _error, ...fieldState } = getFieldState(name, formState);

    const { message } = _error ?? {};
    const error = message ? { message } : undefined;

    return {
      ...registeredProps,
      ...fieldState,
      disabled: _disabled,
      error,
    };
  }, [
    disabled,
    formState,
    getFieldState,
    name,
    onBlur,
    onChange,
    register,
    validate,
  ]);

  return (
    <FieldContext.Provider value={value}>{children}</FieldContext.Provider>
  );
}
