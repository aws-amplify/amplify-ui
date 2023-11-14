import React from 'react';
import { useFormContext } from 'react-hook-form';
import { noop } from '@aws-amplify/ui';

import {
  FormValues,
  RegisterFieldParams,
  SetFormValueParams,
  SubmitHandler,
  UseForm,
  UseFormParams,
} from './types';

export const DEFAULT_ERROR_MESSAGE =
  '`useForm` must be called inside a `FormProvider`';

/**
 * Utility hook corresponding to `FormProvider`, must be used within a `FormProvider`
 *
 * @internal Extend for public export. `useForm` and `UseForm` are an abstraction layer
 * on top of `useFormContext` and `UseFormReturn`, imported from `react-hook-form`
 *
 * @param options optional parameters
 * @returns `Form` utilities
 */
export default function useForm<
  Values extends FormValues = FormValues,
  OnSubmit extends SubmitHandler = SubmitHandler
>(options: UseFormParams<Values, OnSubmit> = {}): UseForm<Values> {
  const formContext = useFormContext();
  const { errorMessage, onSubmit: _onSubmit } = options;

  if (!formContext) {
    throw new Error(errorMessage ?? DEFAULT_ERROR_MESSAGE);
  }

  const {
    formState,
    getFieldState: _getFieldState,
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
  } = formContext;

  // Do not memoize, `formState` updates on all events
  const getFieldState = (name: string) => {
    const { error, ...fieldState } = _getFieldState(name, formState);

    const { message: errorMessage } = error ?? {};
    return { ...fieldState, errorMessage, hasError: !!errorMessage };
  };

  // memoize `registerField` and `setFormValue` together,
  // `register` and `setValue` maintain stable references
  const { registerField, setFormValue } = React.useMemo(() => {
    return {
      registerField: ({ name, ...options }: RegisterFieldParams) =>
        register(name, options),
      setFormValue: ({ name, value, ...options }: SetFormValueParams) =>
        setValue(name, value, options),
    };
  }, [register, setValue]);

  const onSubmit = React.useCallback(
    (event?: React.BaseSyntheticEvent) => {
      const handler = _onSubmit ? handleSubmit(_onSubmit) : noop;

      handler(event);
    },
    [_onSubmit, handleSubmit]
  );

  return {
    getFieldState,
    getValues,
    isValid: formState.isValid,
    onSubmit,
    registerField,
    reset,
    setFormValue,
  };
}
