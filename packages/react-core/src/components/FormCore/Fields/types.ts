import { ChangeHandler, FormValues, RegisterProps, Validate } from '../types';

export interface FieldContextType<Name extends string = string>
  extends RegisterProps {
  error: { message: string } | undefined;
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  name: Name;
}

export type Handler = ChangeHandler | undefined;

export interface FieldProviderProps<
  OnBlur extends Handler,
  OnChange extends Handler,
  Values extends FormValues = FormValues
> {
  children?: React.ReactNode;
  disabled?: boolean;
  onBlur?: OnBlur;
  onChange?: OnChange;
  name: string;
  validate?: Validate<Values>;
}
