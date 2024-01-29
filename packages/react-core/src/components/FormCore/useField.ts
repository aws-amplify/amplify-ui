import useForm from './useForm';
import { ChangeHandler, FocusHandler, UseField, UseFieldParams } from './types';

export const DEFAULT_ERROR_MESSAGE =
  '`useField` must be used within a `FormProvider`';

/**
 * `Field` integration hook for usage with React `Field` components.
 *
 * @param params Requires `name`, all additional params optional
 * @returns `Form` aware `Field` event handlers and state values
 */
export default function useField<
  OnBlur extends FocusHandler,
  OnChange extends ChangeHandler
>(params: UseFieldParams<OnBlur, OnChange>): UseField {
  const { getFieldState, registerField } = useForm({
    errorMessage: DEFAULT_ERROR_MESSAGE,
  });

  return {
    ...registerField(params),
    ...getFieldState(params.name),
  };
}
