import React from 'react';
import { DefaultValues } from 'react-hook-form';

export interface FormValues {
  [k: string]: string;
}

export type ChangeHandler = (event?: any) => void;

type OnBlur = ChangeHandler;
type OnChange = ChangeHandler;
type RefCallback = (node: any) => void;

export type SetValue<Name extends string = string> = (
  name: Name,
  value: string,
  options?: { shouldValidate?: boolean }
) => void;

export type SubmitHandler<Values extends FormValues = FormValues> = (
  values: Values,
  event?: React.BaseSyntheticEvent
) => unknown | Promise<unknown>;

export type HandleSubmit<Values extends FormValues = FormValues> = (
  onSubmit: SubmitHandler<Values>
) => (e?: React.BaseSyntheticEvent) => Promise<void>;

/**
 * `Field` validator callback
 *
 * @param value current `Field` value`
 * @param values current `Form` values
 * @returns `string` message on invalid `Field`, `undefined` on valid
 */
export type Validator<T extends FormValues = FormValues> = (
  value: string,
  values: T
) => string | undefined;

export type Validate<T extends FormValues = FormValues> =
  | Validator<T>
  | Record<string, Validator<T>>;

interface RegisterOptions<Values extends FormValues = FormValues> {
  disabled?: boolean;
  onBlur?: OnBlur;
  onChange?: OnChange;
  validate?: Validator<Values>;
  value?: string;
}

export interface RegisterProps<Name extends string = string> {
  disabled?: boolean;
  name: Name;
  onBlur: OnBlur;
  onChange: OnChange;
  ref: RefCallback;
}

type Register<
  Name extends string = string,
  Values extends FormValues = FormValues
> = (name: Name, options?: RegisterOptions<Values>) => RegisterProps<Name>;

export type UseForm<Values extends FormValues = FormValues> = {
  getValues: () => Values;
  handleSubmit: HandleSubmit<Values>;
  isValid: boolean;
  register: Register;
  reset: (values?: Values) => void;
  setValue: SetValue;
};

export type OnSubmit<Values extends FormValues = FormValues> =
  SubmitHandler<Values>;

export type FormHandle<Values extends FormValues = FormValues> = {
  getValues: () => Values;
  reset: () => void;
};

type ValidationMode = 'onBlur' | 'onChange' | 'onSubmit' | 'onTouched' | 'all';

export interface FormProviderProps<Values extends FormValues = FormValues> {
  children?: React.ReactNode;
  defaultValues?: DefaultValues<Values>;
  mode?: ValidationMode;
}
