import React from 'react';
import { DefaultValues } from 'react-hook-form';

export interface FormValues {
  [k: string]: string;
}

export type FocusHandler = (event?: any) => void;
export type ChangeHandler = (event?: any) => void;

export type SubmitHandler<Values extends FormValues = FormValues> = (
  values: Values,
  event?: React.BaseSyntheticEvent
) => void;

type RefCallback = (node: any) => void;

export interface SetFormValueParams<Name extends string = string> {
  /**
   * `Form` value `name`
   */
  name: Name;

  /**
   * `value` to be applied
   */
  value: string;

  /**
   * Whether validation should be ran
   */
  shouldValidate?: boolean;
}

type SetFormValue<Name extends string = string> = (
  params: SetFormValueParams<Name>
) => void;

/**
 * `Field` validator callback
 *
 * @param value current `Field` value`
 * @param values current `Form` values
 * @returns `string` message on invalid `Field`, `undefined` on valid
 */
export type Validator<Values extends FormValues = FormValues> = (
  value: string,
  values: Values
) => string | undefined;

export type Validate<Values extends FormValues = FormValues> =
  | Validator<Values>
  | Record<string, Validator<Values>>;

export interface RegisterFieldParams<Values extends FormValues = FormValues> {
  disabled?: boolean;
  name: string;
  onBlur?: FocusHandler;
  onChange?: ChangeHandler;
  validate?: Validate<Values>;
  value?: string;
}

export interface UseFormParams<
  Values extends FormValues = FormValues,
  OnSubmit extends SubmitHandler<Values> = SubmitHandler<Values>
> {
  /**
   * Custom error message provided to `Error` on call to `useForm` outside `FormProvider`
   */
  errorMessage?: string;

  /**
   * Submit event handler
   */
  onSubmit?: OnSubmit;
}

/**
 * `Form` aware `Field` props to be provided to UI components
 */
interface RegisterProps<Name extends string = string> {
  disabled?: boolean;
  name: Name;
  onBlur: FocusHandler;
  onChange: ChangeHandler;
  ref: RefCallback;
}

interface FieldState {
  errorMessage: string | undefined;
  hasError: boolean;
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
}

export type UseForm<Values extends FormValues = FormValues> = {
  /**
   * Get `Field` state of `name`
   */
  getFieldState: (name: string) => FieldState;

  /**
   * Get current `Form` values
   */
  getValues: () => FormValues;

  /**
   * `Form` validity state
   */
  isValid: boolean;

  /**
   * Registers `name` to `Form` values, returns `Form` aware `Field` handlers and `ref`
   */
  registerField: (params: RegisterFieldParams) => RegisterProps;

  /**
   * Reset `Form` values
   */
  reset: (values: Values) => void;

  /**
   * Sets `Form` value of `name` param to provided `value`
   */
  setFormValue: SetFormValue;

  /**
   * `Form` submit callback prop
   *
   * @usage
   * ```tsx
   * const { onSubmit } = useForm();
   *
   * <form onSubmit={onSubmit} />
   * ```
   */
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
};

export type FormHandle<Values extends FormValues = FormValues> = {
  /**
   * Get current `Form` values
   */
  getValues: () => Values;

  /**
   * Reset `Form` values to default values
   */
  reset: () => void;
};

type ValidationMode = 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';

export interface FormProviderProps<Values extends FormValues = FormValues> {
  /**
   * `Form` children
   */
  children?: React.ReactNode;

  /**
   * `Form` default values
   */
  defaultValues?: DefaultValues<Values>;

  /**
   * Validation mode applied to `Field` components:
   *
   * - `onTouched`: Validate on first blur event and every subsequent change event
   * - `onBlur`: validate on blur events only
   * - `onChange`: validate on change events, non-performant
   * - `all`: validate on blur and change events
   *
   * @default
   * "onTouched"
   */
  mode?: ValidationMode;
}

/**
 * For use with React only.
 */
export interface UseField<Name extends string = string>
  extends FieldState,
    RegisterProps {
  name: Name;
}

/**
 * For use with React only.
 */
export interface UseFieldParams<
  OnBlur extends FocusHandler | undefined,
  OnChange extends ChangeHandler | undefined,
  Values extends FormValues = FormValues
> {
  /**
   * Controlled `disabled` state
   */
  disabled?: boolean;

  /**
   * Controlled blur event handler
   */
  onBlur?: OnBlur;

  /**
   * Controlled change event handler
   */
  onChange?: OnChange;

  /**
   * `Field` name, must be unique
   */
  name: string;

  /**
   * `Field` validation handler. Accepts a callback function or an
   * object of callback functions to validate against
   *
   * @usage
   * ```tsx
   *
   * // validate `password` and `confim_pasword` values match
   * const validate = (value: string, values: Values) =>
   *   value === values['confirm_password']
   *     ? undefined
   *     : 'Passwords must match!';
   *
   *
   * const passwordProps = useField({ name: 'password' });
   *
   * const confirmPasswordProps = useField({
   *   name: 'confirm_password',
   *   validate
   * });
   *
   * return (
   *   <>
   *     <TextField {...passwordProps} />
   *     <TextField {...confirmPasswordProps} />
   *   </>
   * )
   * ```
   */
  validate?: Validate<Values>;
}

/**
 * For use with React Native only.
 */
export interface UseControlledFieldParams<
  OnBlur extends FocusHandler | undefined,
  Values extends FormValues = FormValues
> extends Omit<UseFieldParams<OnBlur, undefined, Values>, 'onChange'> {
  /**
   * Controlled text change event handler
   */
  onChangeText?: (value: string) => void;
}

/**
 * For use with React Native only.
 */
export interface UseControlledField<Name extends string = string>
  extends Omit<UseField<Name>, 'onChange'> {
  name: Name;

  /**
   * React Native only.
   * Controlled text change event handler
   */
  onChangeText: (value: string) => void;

  value: string;
}
