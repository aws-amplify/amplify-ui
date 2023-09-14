import { useController } from 'react-hook-form';

import {
  FormValues,
  FocusHandler,
  UseControlledField,
  UseControlledFieldParams,
} from './types';
import { isTypedFunction } from '@aws-amplify/ui';

export const DEFAULT_ERROR_MESSAGE =
  '`useControlledField` must be used within a `FormProvider`';

/**
 * `Field` integration hook for usage with React Native `Field` components
 *
 * @param params Requires `name`, all additional params optional
 * @returns `Form` aware `Field` handlers and state values
 */
export default function useControlledField<OnBlur extends FocusHandler>({
  onBlur: _onBlur,
  onChangeText: _onChangeText,
  ...rest
}: UseControlledFieldParams<OnBlur>): UseControlledField {
  // If called outside a `FormProvider`, `useController` throws a `TypeError` instead
  // of failing gracefully (for example returning `undefined` or `null`).
  // Wrap call to `useController` in a `try`/`catch` for graceful failure
  let controller;
  try {
    controller = useController<FormValues>(rest);
  } catch {
    throw new Error(DEFAULT_ERROR_MESSAGE);
  }

  const {
    // `useController.onChange` handles `string` values passed directly to `onChange`
    // for RN support, map to `onChangeText`
    field: { name, onBlur, onChange: onChangeText, ref, value },
    fieldState: { error, isDirty, isTouched },
    formState: { isValid: invalid },
  } = controller;

  const errorMessage = error?.message;
  const hasError = !!errorMessage;

  const handleBlur = (event: Parameters<OnBlur>[0]) => {
    if (isTypedFunction(_onBlur)) {
      _onBlur(event);
    }
    // `useController.onBlur` does not receive params
    onBlur();
  };

  const handleChangeText = (event: string) => {
    if (isTypedFunction(_onChangeText)) {
      _onChangeText(event);
    }
    onChangeText(event);
  };

  return {
    errorMessage,
    hasError,
    invalid,
    isDirty,
    isTouched,
    name,
    onBlur: handleBlur,
    onChangeText: handleChangeText,
    ref,
    value,
  };
}
